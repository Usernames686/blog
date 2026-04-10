# china路闄?
涓€涓嚜鎵樼鐨勪釜浜哄崥瀹?/ 浣滃搧灞曠ず绔欓」鐩紝鍓嶇浣跨敤 React + Vite锛屽悗绔娇鐢?Express + PostgreSQL锛屾敮鎸佹枃绔犲睍绀恒€佸悗鍙扮櫥褰曞拰鏂囩珷绠＄悊銆?
## 椤圭洰绠€浠?
杩欎釜椤圭洰鏈€鍒濇槸涓€涓墠绔睍绀虹珯锛屽悗缁凡缁忔敼閫犳垚鍓嶅悗绔竴浣撶殑鍗氬绯荤粺锛?
- 鍓嶅彴鐢ㄤ簬灞曠ず棣栭〉鍐呭鍜屾枃绔犲垪琛?- 鍚庡彴鏀寔绠＄悊鍛樼櫥褰?- 鏀寔鏂囩珷鏂板銆佺紪杈戙€佸垹闄?- 鏀寔灏侀潰鍥惧拰鍐呭閰嶅浘
- 鏀寔閮ㄧ讲鍒拌嚜宸辩殑鏈嶅姟鍣ㄥ苟杩炴帴 PostgreSQL

褰撳墠浠ｇ爜搴撳凡缁忎笉鍐嶆槸鏈€鍒濈殑 AI Studio 绀轰緥妯℃澘锛岃€屾槸涓€涓彲浠ョ嫭绔嬮儴缃茬殑鍗氬椤圭洰銆?
## 鍔熻兘鐗规€?
- 涓汉涓婚〉 / 瑙嗚灞曠ず棣栭〉
- 鏂囩珷鍒楄〃鍔犺浇
- 鏂囩珷璇︽儏鏌ョ湅
- 绠＄悊鍛樼櫥褰?- 鏂囩珷鍙戝竷
- 鏂囩珷缂栬緫
- 鏂囩珷鍒犻櫎
- 灏侀潰鍥句笂浼?- 鍐呭鍥剧墖涓婁紶
- 鑷缓鍚庣 API
- PostgreSQL 鏁版嵁瀛樺偍

## 鎶€鏈爤

### 鍓嶇

- React 19
- Vite 6
- TypeScript
- Motion
- Lucide React

### 鍚庣

- Express
- PostgreSQL
- pg
- JWT 閴存潈
- bcryptjs
- cors

## 椤圭洰缁撴瀯

```text
.
鈹溾攢 server/                  # Node / Express 鍚庣
鈹溾攢 src/                     # React 鍓嶇婧愮爜
鈹溾攢 index.html               # 鍓嶇鍏ュ彛
鈹溾攢 package.json             # 椤圭洰鑴氭湰涓庝緷璧?鈹溾攢 .env.example             # 鍓嶇鐜鍙橀噺绀轰緥
鈹溾攢 .env.server.example      # 鍚庣鐜鍙橀噺绀轰緥
鈹溾攢 firestore.rules          # 鍘嗗彶 Firebase 瑙勫垯鏂囦欢锛堝凡闈炲綋鍓嶄富閾捐矾锛?鈹斺攢 WEBSITE.md               # 椤圭洰琛ュ厖璇存槑鏂囨。
```

## 鏈湴寮€鍙?
### 1. 瀹夎渚濊禆

```bash
npm install
```

### 2. 鍚姩鍓嶇寮€鍙戠幆澧?
```bash
npm run dev
```

榛樿浼氬惎鍔ㄥ湪锛?
```text
http://127.0.0.1:3000
```

### 3. 鍚姩鍚庣鏈嶅姟

```bash
npm run server:dev
```

鎴栫敓浜фā寮忓惎鍔細

```bash
npm run server
```

榛樿鍚庣绔彛锛?
```text
8318
```

## 鏋勫缓椤圭洰

```bash
npm run build
```

鏋勫缓瀹屾垚鍚庝細鐢熸垚鍓嶇 `dist` 鐩綍锛屽悗绔細鐩存帴鎵樼璇ラ潤鎬佽祫婧愩€?
## 鐜鍙橀噺

### 鍓嶇鐜鍙橀噺

鍙弬鑰冿細

```text
.env.example
```

鍓嶇褰撳墠鏈€閲嶈鐨勬槸锛?
```env
VITE_API_BASE_URL=http://127.0.0.1:8318
```

### 鍚庣鐜鍙橀噺

鍙弬鑰冿細

```text
.env.server.example
```

绀轰緥锛?
```env
PORT=8318
DATABASE_URL=postgresql://your_user:your_password@127.0.0.1:5432/portfolio_db
JWT_SECRET=replace-with-very-long-random-secret
ADMIN_ACCOUNT=admin
ADMIN_EMAIL=admin@system.local
ADMIN_PASSWORD=123456
CORS_ORIGIN=*
VITE_API_BASE_URL=http://127.0.0.1:8318
```

## 鍚庣鎺ュ彛

### 鍋ュ悍妫€鏌?
```http
GET /api/health
```

### 鐧诲綍

```http
POST /api/auth/login
```

璇锋眰绀轰緥锛?
```json
{
  "account": "admin",
  "password": "123456"
}
```

### 鑾峰彇褰撳墠鐢ㄦ埛

```http
GET /api/auth/me
```

### 鑾峰彇鏂囩珷鍒楄〃

```http
GET /api/articles
```

### 鏂板鏂囩珷

```http
POST /api/articles
```

### 鏇存柊鏂囩珷

```http
PATCH /api/articles/:id
```

### 鍒犻櫎鏂囩珷

```http
DELETE /api/articles/:id
```

闄ゅ叕寮€璇诲彇鎺ュ彛澶栵紝鍏朵綑鎺ュ彛闇€瑕佹惡甯︼細

```http
Authorization: Bearer <token>
```

## 鏁版嵁搴撹鏄?
褰撳墠椤圭洰鍚庣鍩轰簬 PostgreSQL锛屾牳蹇冩暟鎹寘鎷細

- `users`
  - 瀛樼鐞嗗憳鍜岀敤鎴疯处鍙?  - 淇濆瓨閭銆佸瘑鐮佸搱甯屻€佽鑹茬瓑淇℃伅
- `articles`
  - 淇濆瓨鏂囩珷鏍囬銆佺畝浠嬨€佹鏂囥€佸紩鐢ㄣ€佸皝闈㈠浘銆佸唴瀹瑰浘鐗囥€佷綔鑰呯瓑淇℃伅

鍚庣鍚姩鏃朵細鑷姩灏濊瘯鍒濆鍖栫鐞嗗憳璐﹀彿銆?
## 榛樿绠＄悊鍛樹俊鎭?
濡傛灉鏈慨鏀圭幆澧冨彉閲忥紝榛樿浼氳鍙栵細

- 璐﹀彿锛歚admin`
- 閭锛歚admin@system.local`
- 瀵嗙爜锛歚123456`

姝ｅ紡鐜鍔″繀鏀规帀銆?
## 閮ㄧ讲璇存槑

褰撳墠椤圭洰閫傚悎閮ㄧ讲鍦ㄨ嚜宸辩殑鏈嶅姟鍣ㄤ笂锛屽吀鍨嬫柟寮忓涓嬶細

1. 鍓嶇鎵ц `npm run build`
2. 鍚庣鎵ц `npm run server`
3. 浣跨敤 Nginx / OpenResty 鍋氬弽鍚戜唬鐞?4. PostgreSQL 閮ㄧ讲鍦ㄦ湰鏈烘垨鍐呯綉
5. 瀵瑰鍙紑鏀?`80/443`

鎺ㄨ崘鐢熶骇缁撴瀯锛?
- 鍓嶇鏋勫缓浜х墿锛歚dist/`
- Node 鏈嶅姟锛歚server/index.mjs`
- 鏁版嵁搴擄細PostgreSQL
- 鍙嶅悜浠ｇ悊锛歂ginx / OpenResty / 1Panel

## 瀹夊叏寤鸿

- 涓嶈鍦ㄧ敓浜х幆澧冧娇鐢ㄩ粯璁ょ鐞嗗憳璐﹀彿鍜屽瘑鐮?- 涓嶈鎶婃暟鎹簱绔彛鐩存帴鏆撮湶鍒板叕缃?- `JWT_SECRET` 蹇呴』鏀规垚楂樺己搴﹂殢鏈哄瓧绗︿覆
- `CORS_ORIGIN` 涓嶅缓璁暱鏈熶娇鐢?`*`
- 鍥剧墖涓嶅缓璁暱鏈熶互 base64 褰㈠紡鐩存帴瀛樻暟鎹簱锛屽彲閫愭杩佺Щ鍒板璞″瓨鍌?
## 甯哥敤鍛戒护

```bash
npm run dev
npm run build
npm run server
npm run server:dev
npm run lint
```

## 褰撳墠鐘舵€佽鏄?
杩欎釜浠撳簱宸茬粡浠庢渶鍒濈殑绀轰緥椤圭洰锛岃皟鏁翠负閫傚悎涓汉鍗氬鍦烘櫙鐨勭増鏈€傚綋鍓嶄富閾捐矾鏄細

- React 鍓嶇
- Express API
- PostgreSQL 瀛樺偍
- 鑷缓鏈嶅姟鍣ㄩ儴缃?
濡傛灉浣犲悗闈㈣繕瑕佺户缁暣鐞嗛」鐩枃妗ｏ紝寤鸿鍚屾椂缁存姢锛?
- `README.md`锛氱粰浠撳簱璁块棶鑰呯湅
- `WEBSITE.md`锛氱粰鑷繁鍋氶」鐩鏄庡拰杩愮淮璁板綍

## License

濡傞渶寮€婧愬彂甯冿紝鍙牴鎹綘鐨勯渶瑕佽ˉ鍏?MIT銆丄pache-2.0 鎴栬嚜瀹氫箟璁稿彲璇存槑銆?