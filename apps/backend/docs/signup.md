# 회원가입 API

MySQL, Redis 6 이상과 SMTP 설정이 필요합니다. apps/backend/.env.example을 참고해 apps/backend/.env를 만들고 저장소 루트에서 pnpm --filter backend dev로 시작합니다. 실제 비밀값은 커밋하지 않습니다.

1. POST /auth/email/send: { "email": "member@gmail.com" }. 200 응답: { "expiresIn": 300, "resendAfter": 60 }.
2. POST /auth/email/verify: { "email": "member@gmail.com", "code": "123456" }. 200 응답의 verificationToken을 보관합니다. 인증번호는 5분, 최대 5회 시도이며 성공하면 폐기됩니다.
3. POST /auth/register: { "username": "lfc_user", "email": "member@gmail.com", "password": "your-password", "verificationToken": "verify 응답의 토큰" }. 201 응답: { "id": 1, "username": "lfc_user", "email": "member@gmail.com" }.

아이디는 소문자 영문/숫자/밑줄 4~20자입니다. 비밀번호는 8자 이상, UTF-8 72바이트 이하이며 bcrypt cost 12로 저장합니다. 이메일은 공백 제거 및 소문자로 정규화합니다. 가입 응답에는 비밀번호와 JWT를 포함하지 않습니다. 회원가입 후 별도 로그인 API를 호출합니다.

가입 토큰은 인증한 이메일에 귀속되고 10분간 한 번만 사용할 수 있습니다. DB 저장 직전에 원자적으로 소비합니다. 저장 오류가 발생한 경우 이메일 인증부터 다시 진행해야 합니다. 이메일 재발송은 60초 간격이며 IP당 시간당 발송 20회, 인증 확인 100회, 가입 30회로 제한합니다. 잘못된 번호를 5회 입력하면 새 번호를 요청해야 합니다. SMTP 실패 시 인증번호는 폐기되며 60초 후 재시도할 수 있습니다.

Gmail은 2단계 인증을 켜고 발급한 앱 비밀번호를 SMTP_PASSWORD에 설정합니다. SMTP 설정이 없어도 기존 서버 기능은 부팅되지만 메일 요청은 503을 반환합니다. 메일 본문/번호/비밀번호를 서버 로그에 남기지 않습니다.

현재 DB 설정은 synchronize: true로 username unique 인덱스를 반영합니다. 기존 member에 중복 username이 있다면 먼저 해결해야 합니다. 운영 적용 시에는 synchronize 대신 별도 DB 마이그레이션이 필요합니다. 프록시 환경은 신뢰할 프록시 범위를 먼저 설정해야 실제 사용자 IP를 기준으로 제한할 수 있습니다. 전달된 X-Forwarded-For를 직접 신뢰하지 않습니다.

Swagger: http://localhost:3000/api. 오류 상태: 400 잘못된 입력/인증 만료, 409 아이디 또는 이메일 중복, 429 요청 제한, 503 메일 발송 실패.

## 로그인 및 프론트 연동

POST /auth/login: { "username": "lfc_user", "password": "your-password" }. 성공 시 200과 { "accessToken": "...", "refreshToken": "..." }를 반환합니다. 아이디 또는 비밀번호가 틀리면 동일한 401 메시지를 반환합니다. IP당 시간당 60회 제한이며, Refresh Token은 기존 방식으로 Redis에 저장됩니다.

프론트 /signup에서 인증번호 발송 → 번호 확인 → 회원가입을 진행합니다. 이메일을 수정하면 인증 상태가 초기화되고, 가입 성공 시 /login으로 이동합니다. 프론트 /login은 이메일 대신 가입 시 설정한 아이디를 받습니다. 성공한 로그인만 /day/1로 이동합니다.

로그인 응답은 현재 탭의 sessionStorage에 lfc.auth.v1 키로 저장합니다. 비밀번호는 저장하지 않습니다. account/auth-session.ts의 getAuthSession()으로 토큰을 조회할 수 있습니다. 새로고침 시 GET /auth/me로 세션을 확인하며, 보호된 화면은 인증 완료 후 표시합니다. Access Token이 만료되기 직전이거나 보호 API가 401을 반환하면 POST /auth/refresh로 한 번 갱신합니다. 동시 요청은 하나의 갱신 요청을 공유하고 원래 요청은 최대 한 번 재시도합니다. 최종 인증 실패 시 세션을 지우고 로그인으로 이동하며 원래 내부 주소를 보존합니다. 서버/네트워크 장애는 세션을 보존하고 다시 연결하기를 표시합니다. 헤더 이름은 실제 로그인 아이디로 표시하며 재화와 마이페이지 프로필 등의 기존 목업은 이번 작업에서 변경하지 않습니다. 마이페이지 로그아웃 링크는 /logout에서 서버 Refresh Token을 폐기하고 로컬 세션을 삭제합니다. 기존 생성 API의 요청 함수는 세션이 있으면 인증 헤더와 자동 갱신을 사용하고, 세션이 없으면 기존 공개 요청을 유지합니다. 로그인 자체는 기존 Refresh Token 계약을 재사용하며, 기존 로그아웃은 Refresh Token을 지웁니다. Access Token은 만료 전까지 유효합니다.

프론트는 기존 VITE_API_URL을 사용하고, 미설정 시 http://localhost:3000으로 요청합니다. SMTP 정보는 백엔드 .env에만 두며 VITE_ 환경변수로 전달하지 않습니다.

## 인증 오류 코드

인증 비즈니스 오류는 src/domain/auth/exception/auth-error-code.enum.ts의 AuthErrorCode와 AUTH_ERRORS에서 관리합니다. 서비스는 new AuthException(AuthErrorCode.INVALID_CREDENTIALS)처럼 코드만 지정하며 HTTP 상태와 메시지는 중앙 정의를 사용합니다.

오류 응답 예: { "statusCode": 401, "code": "AUTH_INVALID_CREDENTIALS", "message": "아이디 또는 비밀번호가 올바르지 않습니다." }. 기존 message 필드는 유지합니다. 인증 컨트롤러의 AuthExceptionFilter는 DTO 검증 오류를 AUTH_INVALID_REQUEST, JWT 가드의 인증 실패를 AUTH_INVALID_TOKEN으로 변환합니다. 다른 도메인의 예외 응답과 전역 필터는 변경하지 않습니다. 예상하지 못한 DB/Redis 등의 내부 오류는 기존 Nest 기본 처리를 따릅니다.

GET /auth/me는 Access Token을 검증하고 회원 저장소에서 id, username, email만 조회합니다. 탈퇴 등으로 회원이 없으면 AUTH_INVALID_TOKEN을 반환합니다. 서버 로그아웃 후에도 이미 발급한 Access Token은 기존 설계대로 만료 시점까지 유효합니다. 프론트 저장소는 현재 탭에서 새로고침할 때 유지되고, 탭을 닫으면 종료되는 sessionStorage를 사용합니다. 자동 갱신이 늦게 도착해도 로그아웃이나 새 로그인 상태를 덮어쓰지 않도록 세션 버전을 확인합니다.

프론트 인증 클라이언트 테스트: pnpm --filter frontend test:auth. 외부 서비스를 모의 응답으로 대체하여 DB/Redis/SMTP 없이 실행합니다. 백엔드 세션 HTTP 테스트는 실제 JWT 전략과 가드를 사용하고 회원 저장소 및 Redis만 모의 객체로 제공합니다. 실제 DB/Redis 전체 흐름은 별도 연결 테스트가 필요합니다.
