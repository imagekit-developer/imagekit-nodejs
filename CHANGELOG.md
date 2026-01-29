# Changelog

## 7.2.2 (2026-01-29)

Full Changelog: [v7.2.1...v7.2.2](https://github.com/imagekit-developer/imagekit-nodejs/compare/v7.2.1...v7.2.2)

### Bug Fixes

* **docs:** fix mcp installation instructions for remote servers ([ee47d5b](https://github.com/imagekit-developer/imagekit-nodejs/commit/ee47d5b46bb0afc38f5809234096766204f035ae))
* **mcp:** allow falling back for required env variables ([f028ce8](https://github.com/imagekit-developer/imagekit-nodejs/commit/f028ce8ce2ba895d6db244fefc9183405bf2bd27))
* **overlay:** update subtitle overlay parameter to plural form ([22f0dfb](https://github.com/imagekit-developer/imagekit-nodejs/commit/22f0dfb35d183471ae799fad14130211d51dfc62))


### Chores

* **ci:** upgrade `actions/github-script` ([0f7befe](https://github.com/imagekit-developer/imagekit-nodejs/commit/0f7befeb90a4fc79be9237f4ece4ba14d0d7b00f))
* **internal:** codegen related update ([5adb9c4](https://github.com/imagekit-developer/imagekit-nodejs/commit/5adb9c42ba77e464f9ed88e3675010cb0872a541))
* **internal:** codegen related update ([4a66092](https://github.com/imagekit-developer/imagekit-nodejs/commit/4a6609212873e4cc9763a1b583b764a6ed98ab00))
* **internal:** codegen related update ([20d55fc](https://github.com/imagekit-developer/imagekit-nodejs/commit/20d55fc5ee61452b573d8a85b4823553b2794e9e))
* **internal:** update lock file ([1a431a8](https://github.com/imagekit-developer/imagekit-nodejs/commit/1a431a801f32d32b08e512fbd9c69b8fdf5bafd6))
* **internal:** upgrade wrangler version ([3042a38](https://github.com/imagekit-developer/imagekit-nodejs/commit/3042a38b910d43e8bc3f51c90fa93c007d9b13d0))
* **mcp:** up tsconfig lib version to es2022 ([f9bd7c0](https://github.com/imagekit-developer/imagekit-nodejs/commit/f9bd7c00e2fa3bc37e4a9922482c4cfc199b50a0))

## 7.2.1 (2026-01-20)

Full Changelog: [v7.2.0...v7.2.1](https://github.com/imagekit-developer/imagekit-nodejs/compare/v7.2.0...v7.2.1)

### Bug Fixes

* vocab field is required ([e6d0e58](https://github.com/imagekit-developer/imagekit-nodejs/commit/e6d0e58cb00e59a4fbfd81ed9b555bcc7fd97f2c))


### Chores

* **internal:** update `actions/checkout` version ([6f64673](https://github.com/imagekit-developer/imagekit-nodejs/commit/6f646734061e67193ecdda3eb6c507787b2785d5))

## 7.2.0 (2026-01-16)

Full Changelog: [v7.1.1...v7.2.0](https://github.com/imagekit-developer/imagekit-nodejs/compare/v7.1.1...v7.2.0)

### ⚠ BREAKING CHANGES

* **mcp:** remove deprecated tool schemes
* **mcp:** **Migration:** To migrate, simply modify the command used to invoke the MCP server. Currently, the only supported tool scheme is code mode. Now, starting the server with just `node /path/to/mcp/server` or `npx package-name` will invoke code tools: changing your command to one of these is likely all you will need to do.

### Features

* **api:** add GetImageAttributesOptions and ResponsiveImageAttributes schemas; update resource references in main.yaml; remove dummy endpoint ([9ea439a](https://github.com/imagekit-developer/imagekit-nodejs/commit/9ea439a2d0a4c8300d14d4424dc72ab40a67c4d4))
* **api:** Add saved extensions API and enhance transformation options ([7916069](https://github.com/imagekit-developer/imagekit-nodejs/commit/791606953c40bd9962591516767c44473d71c0ee))
* **mcp:** add detail field to docs search tool ([f36d795](https://github.com/imagekit-developer/imagekit-nodejs/commit/f36d79523b0613a27afd45d56f4e1e906e6fdfe9))
* **mcp:** add typescript check to code execution tool ([63ab735](https://github.com/imagekit-developer/imagekit-nodejs/commit/63ab735bf6c8458a53bd66c8c437b45a7aef60fe))
* **mcp:** enable optional code execution tool on http mcp servers ([cc68e38](https://github.com/imagekit-developer/imagekit-nodejs/commit/cc68e38fa61078db6a5c961e7ed75dad342dc7e8))
* **mcp:** handle code mode calls in the Stainless API ([eb22f08](https://github.com/imagekit-developer/imagekit-nodejs/commit/eb22f0883fc74c94959fdd97e50d41d940e1aed6))
* **mcp:** return logs on code tool errors ([6118fe4](https://github.com/imagekit-developer/imagekit-nodejs/commit/6118fe4804be492482268ff25e0afc714bea7613))
* **saved-extensions:** update example for creating saved extension to use AI tasks for fashion item categorization ([79e535b](https://github.com/imagekit-developer/imagekit-nodejs/commit/79e535b8725ebc847ffed30b3ec4bad7c06073d3))
* **transformation:** add colorReplace and distort transformations; update tests for new parameters ([e59b5a7](https://github.com/imagekit-developer/imagekit-nodejs/commit/e59b5a74ec330189d6441ff6c00e7f36f88cffad))


### Bug Fixes

* add ai-tasks property to response schemas with enum values ([370cf0f](https://github.com/imagekit-developer/imagekit-nodejs/commit/370cf0ff0d07a404b03d994dd0404301f1af83c4))
* **docs:** remove extraneous example object fields ([a043056](https://github.com/imagekit-developer/imagekit-nodejs/commit/a043056abd2f86bcb5a691ac8f5c7ccf8a17663c))
* **mcp:** add client instantiation options to code tool ([967c8d9](https://github.com/imagekit-developer/imagekit-nodejs/commit/967c8d90503b2e0ed0576b919be09f3b924ec890))
* **mcpb:** pin @anthropic-ai/mcpb version ([d81e225](https://github.com/imagekit-developer/imagekit-nodejs/commit/d81e22560aab772ee9b241fb44a50561b8837034))
* **mcp:** correct code tool API endpoint ([f4d2b6c](https://github.com/imagekit-developer/imagekit-nodejs/commit/f4d2b6c9989e8cc6c69badba7de0abb57e6de398))
* **mcp:** correct code tool api output types ([0371082](https://github.com/imagekit-developer/imagekit-nodejs/commit/03710823b0d477506a6a321c8aa68cba1a95e452))
* **mcp:** fix env parsing ([b33b4e9](https://github.com/imagekit-developer/imagekit-nodejs/commit/b33b4e9c4f595d850403d292057e5d0810303e62))
* **mcp:** fix options parsing ([de44ed6](https://github.com/imagekit-developer/imagekit-nodejs/commit/de44ed62ad53d22aa4b196ca2416d33d784242ee))
* **mcp:** pass base url to code tool ([908fa87](https://github.com/imagekit-developer/imagekit-nodejs/commit/908fa874d20613761caa76cd4b2151524ef87606))
* **mcp:** return correct lines on typescript errors ([aa7ae07](https://github.com/imagekit-developer/imagekit-nodejs/commit/aa7ae07286cf492a7b1fecce34697006837beeef))
* **mcp:** return tool execution error on api error ([1e866f8](https://github.com/imagekit-developer/imagekit-nodejs/commit/1e866f8e5254ecc305b3dfee53ec232455143cc4))
* **mcp:** return tool execution error on jq failure ([d1949db](https://github.com/imagekit-developer/imagekit-nodejs/commit/d1949dbef79859b446ee9ee2c8a2d562568c1cca))
* **mcp:** update cloudflare worker host page ([664a668](https://github.com/imagekit-developer/imagekit-nodejs/commit/664a6686e0b268c2b3d3985508c744358b937cf3))
* **mcp:** update code tool prompt ([e3a5c5e](https://github.com/imagekit-developer/imagekit-nodejs/commit/e3a5c5ed81f7f05cdd00a1703a8e3f8aa24a0eb6))


### Chores

* break long lines in snippets into multiline ([011013e](https://github.com/imagekit-developer/imagekit-nodejs/commit/011013e6bac4c2ca8c6253d3ef482641bb089560))
* **client:** fix logger property type ([6269318](https://github.com/imagekit-developer/imagekit-nodejs/commit/6269318024cd320f3038def32c3d5bf1f1da77a1))
* extract some types in mcp docs ([de606ba](https://github.com/imagekit-developer/imagekit-nodejs/commit/de606ba3b734389e1c52a9929dbf8487828822e0))
* **internal:** bump MCP dependencies ([7c9719e](https://github.com/imagekit-developer/imagekit-nodejs/commit/7c9719e1f913770b5d489c9698342c94d6e8ed98))
* **internal:** codegen related update ([21edf78](https://github.com/imagekit-developer/imagekit-nodejs/commit/21edf78a2165e77fe1ccf766061a64a5caaa5199))
* **internal:** codegen related update ([b42a623](https://github.com/imagekit-developer/imagekit-nodejs/commit/b42a623f7fbdd81ec751b3da2c4c61bd46b92c8c))
* **internal:** codegen related update ([9c3b709](https://github.com/imagekit-developer/imagekit-nodejs/commit/9c3b709077301f692b7ad7696fe532a0247b1180))
* **internal:** codegen related update ([1170954](https://github.com/imagekit-developer/imagekit-nodejs/commit/11709542b015a148d76c641b92f072deefc67d1f))
* **internal:** codegen related update ([4b79947](https://github.com/imagekit-developer/imagekit-nodejs/commit/4b79947c8eb22cf9c609da4efd9ea703caea0c41))
* **internal:** codegen related update ([b6b0d1a](https://github.com/imagekit-developer/imagekit-nodejs/commit/b6b0d1a7d2f00d9ecaa9e0e630a012c25f6a00f4))
* **internal:** codegen related update ([26acc3a](https://github.com/imagekit-developer/imagekit-nodejs/commit/26acc3a9fe08c7c478eed956dd553333bd8cf210))
* **internal:** codegen related update ([662aa87](https://github.com/imagekit-developer/imagekit-nodejs/commit/662aa87091dc519bb811554438eaf978660d035e))
* **internal:** codegen related update ([8c9026a](https://github.com/imagekit-developer/imagekit-nodejs/commit/8c9026ace5d217264e5753c01309a02a2c09095e))
* **internal:** grammar fix (it's -&gt; its) ([71e22a3](https://github.com/imagekit-developer/imagekit-nodejs/commit/71e22a30017324842fed5ab08ee1efbb1eecb6d2))
* **internal:** upgrade babel, qs, js-yaml ([6896958](https://github.com/imagekit-developer/imagekit-nodejs/commit/689695871e48e9d8b28fb002a8b0f161017ca865))
* **internal:** upgrade eslint ([310bf0d](https://github.com/imagekit-developer/imagekit-nodejs/commit/310bf0d0cc1d5b15d08a2cbb483a9969ebf4f11d))
* **internal:** use npm pack for build uploads ([bdfd369](https://github.com/imagekit-developer/imagekit-nodejs/commit/bdfd369118542dad02cf8a0fae8713d0d8bea4eb))
* mcp code tool explicit error message when missing a run function ([6678ee1](https://github.com/imagekit-developer/imagekit-nodejs/commit/6678ee13cc1eee5ce1ac51b672144be77c38e9ea))
* **mcp:** add friendlier MCP code tool errors on incorrect method invocations ([636829d](https://github.com/imagekit-developer/imagekit-nodejs/commit/636829d18a7dda730b65c0549298258afcea6341))
* **mcp:** add intent param to execute tool ([fb2ca9e](https://github.com/imagekit-developer/imagekit-nodejs/commit/fb2ca9eec87dd05ff93481e2fbc3a7885447b022))
* **mcp:** add line numbers to code tool errors ([25e4e59](https://github.com/imagekit-developer/imagekit-nodejs/commit/25e4e59f434c07c2d9afeef3f548dd99e250a7ab))
* **mcp:** clarify http auth error ([00789ac](https://github.com/imagekit-developer/imagekit-nodejs/commit/00789acfb9ceb07af0cd03b1951090f430691592))
* **mcp:** pass intent param to execute handler ([ffd4b9f](https://github.com/imagekit-developer/imagekit-nodejs/commit/ffd4b9f6bb5d6ee10b15fd68f55420e387ddff7d))
* **mcp:** remove deprecated tool schemes ([b1a0e60](https://github.com/imagekit-developer/imagekit-nodejs/commit/b1a0e607e55f27ffed93b2862e8f4466bc609809))
* **mcp:** update lockfile ([0703827](https://github.com/imagekit-developer/imagekit-nodejs/commit/07038271d5ec459516a8a936eb49f31490ccf6b0))
* **mcp:** upgrade dependencies ([7fcf371](https://github.com/imagekit-developer/imagekit-nodejs/commit/7fcf371b0744cdb77ed0e7ec206ad1a9afa78529))
* **mcp:** upgrade jq-web ([0750770](https://github.com/imagekit-developer/imagekit-nodejs/commit/075077081fc5826a4502a76a2abc40788f7915a3))
* use latest @modelcontextprotocol/sdk ([f7b9b4e](https://github.com/imagekit-developer/imagekit-nodejs/commit/f7b9b4e55919b644d9445730c03c8972ecdfe0b7))
* use structured error when code execution tool errors ([451f306](https://github.com/imagekit-developer/imagekit-nodejs/commit/451f306f6328e6c48374d0525dad9a0ddc6511d6))


### Documentation

* add MCP Server Package section to README with details on usage and versioning ([5710576](https://github.com/imagekit-developer/imagekit-nodejs/commit/57105760c82ffa95b80375db3ec985505c197d02))
* **mcp:** add a README button for one-click add to Cursor ([a7575d3](https://github.com/imagekit-developer/imagekit-nodejs/commit/a7575d308e3038715964f7416284bb012e27b240))
* **mcp:** add a README link to add server to VS Code or Claude Code ([2a90d28](https://github.com/imagekit-developer/imagekit-nodejs/commit/2a90d2802e4814d97ec5bba77097eec2f0a5a718))
* prominently feature MCP server setup in root SDK readmes ([80ce57e](https://github.com/imagekit-developer/imagekit-nodejs/commit/80ce57e3dee9eb822c8251ee8ed1c66afcfc156a))
* remove MCP Server section from README ([df32859](https://github.com/imagekit-developer/imagekit-nodejs/commit/df3285946139b100f60c812cf65bcca2d2bf8dd3))


### Refactors

* **crypto-utils:** streamline crypto module import and error handling. Fixes https://github.com/imagekit-developer/imagekit-nodejs/issues/128 ([71910d6](https://github.com/imagekit-developer/imagekit-nodejs/commit/71910d66638a765cb333ee293002946e29b7e6ac))

## 7.1.1 (2025-10-06)

Full Changelog: [v7.1.0...v7.1.1](https://github.com/imagekit-developer/imagekit-nodejs/compare/v7.1.0...v7.1.1)

### Features

* **api:** use scoped package for mcp server ([af9b0f4](https://github.com/imagekit-developer/imagekit-nodejs/commit/af9b0f4abeeef59418ae6fc2dabf65d6270c9bb1))


### Bug Fixes

* add missing 'color' parameter mapping for subtitle overlays transformation. ([2c4a6d2](https://github.com/imagekit-developer/imagekit-nodejs/commit/2c4a6d20aec544c01fb29e7b2d64513527a11ccc))
* lint error ([b320d6f](https://github.com/imagekit-developer/imagekit-nodejs/commit/b320d6f9a03f1aefd1d9edad23618953b29d100c))
* linting issues ([3794fe5](https://github.com/imagekit-developer/imagekit-nodejs/commit/3794fe565330087cae39bb5e35c77b0ecc6c2a2a))
* update raw parameter example in README for clarity ([e86beab](https://github.com/imagekit-developer/imagekit-nodejs/commit/e86beabfa77291baaf3cd3bf6be7f1336170e51d))
* update serverConfig to include valid URLs and improve label descriptions ([49d048f](https://github.com/imagekit-developer/imagekit-nodejs/commit/49d048fba3d9ede0e3e92991e8829d51c04c1229))


### Chores

* configure new SDK language ([33d1237](https://github.com/imagekit-developer/imagekit-nodejs/commit/33d12370088d062a282f81625c63522a5d961308))
* **internal:** remove .eslintcache ([ec12af7](https://github.com/imagekit-developer/imagekit-nodejs/commit/ec12af7ecad37e8f7a227b356acd0d0cc1c52255))
* **jsdoc:** fix [@link](https://github.com/link) annotations to refer only to parts of the package‘s public interface ([4332a7e](https://github.com/imagekit-developer/imagekit-nodejs/commit/4332a7e3680d596f508b6d2c83b1e9faab6af878))


### Documentation

* update README to enhance Table of Contents and add raw transformations parameter ([892d31c](https://github.com/imagekit-developer/imagekit-nodejs/commit/892d31c9105c1c8c9bbd08983c2a0c9a62aee883))


### Refactors

* streamline transformation string handling in URL construction ([6e99777](https://github.com/imagekit-developer/imagekit-nodejs/commit/6e99777260db5c7fe833d4e71abe5abafb95156d))

## 7.1.0 (2025-09-30)

Full Changelog: [v7.0.1...v7.1.0](https://github.com/imagekit-developer/imagekit-nodejs/compare/v7.0.1...v7.1.0)

### Features

* **api:** add path policy related non-breaking changes ([d50cbcf](https://github.com/imagekit-developer/imagekit-nodejs/commit/d50cbcf4cd2535e25310c635539a2ecf2f2e8201))
* **api:** add selectedFieldsSchema in upload and list API response ([ec8c8b8](https://github.com/imagekit-developer/imagekit-nodejs/commit/ec8c8b846e6288e6c13d4bbe4e65ca13d4059fa2))
* **api:** fix upload API request params ([467d77b](https://github.com/imagekit-developer/imagekit-nodejs/commit/467d77b12af3f7f0a0816bffb921b229f6c54a9b))
* **api:** updated docs ([962390f](https://github.com/imagekit-developer/imagekit-nodejs/commit/962390f02b179b6a34f9697c27bc67ed99ba9b99))
* **mcp:** add option for including docs tools ([e1a3b52](https://github.com/imagekit-developer/imagekit-nodejs/commit/e1a3b52f5691f398669cd682c57d5a6dc4e5895a))


### Bug Fixes

* **mcp:** fix cli argument parsing logic ([a8da550](https://github.com/imagekit-developer/imagekit-nodejs/commit/a8da5506c7a39462b7b02bbfec1e4e7a6fbdfdaf))
* **mcp:** resolve a linting issue in server code ([e805d24](https://github.com/imagekit-developer/imagekit-nodejs/commit/e805d24f1d721e1694b927c3c41c5b21a4433fb0))


### Performance Improvements

* faster formatting ([7e8cfad](https://github.com/imagekit-developer/imagekit-nodejs/commit/7e8cfadd5473e55e83c6659c4033f9b852d3f91c))


### Chores

* **internal:** codegen related update ([ca24cab](https://github.com/imagekit-developer/imagekit-nodejs/commit/ca24cab20bc7d4450623d67b0ebcb4e2a0ef7633))
* **internal:** codegen related update ([2acb106](https://github.com/imagekit-developer/imagekit-nodejs/commit/2acb106595f0642dcdb81bcd9a041a1bf059d307))
* **internal:** fix incremental formatting in some cases ([863e6b7](https://github.com/imagekit-developer/imagekit-nodejs/commit/863e6b7b6cff10c81fc07524b038972db2ce76b6))
* **internal:** ignore .eslintcache ([f991673](https://github.com/imagekit-developer/imagekit-nodejs/commit/f99167394b66562e972b54730a4cf65aed8e33fd))
* **internal:** remove deprecated `compilerOptions.baseUrl` from tsconfig.json ([9e0e5b0](https://github.com/imagekit-developer/imagekit-nodejs/commit/9e0e5b0c46930798e8d06f553fd91a57d9692d2b))
* **mcp:** allow pointing `docs_search` tool at other URLs ([bbe84b3](https://github.com/imagekit-developer/imagekit-nodejs/commit/bbe84b3a9a5b30fc11c7b074cea447632740f512))
* update lockfile ([dcdc0b7](https://github.com/imagekit-developer/imagekit-nodejs/commit/dcdc0b74f7d809165bc0e3bce1656626d5dd1240))


### Documentation

* correct typo in default value description for custom metadata field ([a957209](https://github.com/imagekit-developer/imagekit-nodejs/commit/a9572097a933ab5d9c62fda02d4edf8c9fc47eeb))
* fix link to deploy template in README ([ba86045](https://github.com/imagekit-developer/imagekit-nodejs/commit/ba86045ee37ea9c03cce09f8a8028e645f263bbf))

## 7.0.1 (2025-09-21)

Full Changelog: [v7.0.0...v7.0.1](https://github.com/imagekit-developer/imagekit-nodejs/compare/v7.0.0...v7.0.1)

### Chores

* update SDK settings ([0a6ec00](https://github.com/imagekit-developer/imagekit-nodejs/commit/0a6ec001c489c53040ea197d6c864f8b96fa8ac4))

## 7.0.0 (2025-09-21)

Full Changelog: [v0.0.1-alpha.0...v7.0.0](https://github.com/imagekit-developer/imagekit-nodejs/compare/v0.0.1-alpha.0...v7.0.0)

### Features

* add examples for URL generation and transformations in README ([4bad591](https://github.com/imagekit-developer/imagekit-nodejs/commit/4bad5917155a54e60ed5cbdfd10f1c1e98e14842))
* add url signing and test cases ([b1594d8](https://github.com/imagekit-developer/imagekit-nodejs/commit/b1594d8e0e416811bb7a87e3d14492725dc1b2d4))
* add webhook verification section to README with example code ([b28d7b3](https://github.com/imagekit-developer/imagekit-nodejs/commit/b28d7b376c90cf21704870cdd7c9401c86bac21d))
* allow file parameter in FileUploadParams to accept string type for HTTP URL base base64 case. ([738f6d9](https://github.com/imagekit-developer/imagekit-nodejs/commit/738f6d9ef6649d4c9288c2d05f083b2ca9211ee7))
* **api:** add ai-auto-description field with status options to components schema ([96c640d](https://github.com/imagekit-developer/imagekit-nodejs/commit/96c640d86b1810a122c8ba6418dd157cd0e1ff2d))
* **api:** add BaseWebhookEvent ([dac30e1](https://github.com/imagekit-developer/imagekit-nodejs/commit/dac30e1479b5f022c0d59c0bd84ee928ba676dd2))
* **api:** add new webhook events for upload transformations to enhance event tracking ([dd98040](https://github.com/imagekit-developer/imagekit-nodejs/commit/dd9804078ee46a656f8423de2845482bdaca6be8))
* **api:** add signed URL options with expiration settings to enhance security features ([55d2dd1](https://github.com/imagekit-developer/imagekit-nodejs/commit/55d2dd18b0c717a5ede4fea09523098d806e87af))
* **api:** extract UpdateFileDetailsRequest to model ([30d976b](https://github.com/imagekit-developer/imagekit-nodejs/commit/30d976b95ae76c09bc9152badd6bed801bf3cf57))
* **api:** manual updates ([608ef99](https://github.com/imagekit-developer/imagekit-nodejs/commit/608ef9945b576180c3786380262b1a4074bef456))
* **api:** manual updates ([d0d45ee](https://github.com/imagekit-developer/imagekit-nodejs/commit/d0d45ee5351438651649153cb70ed8d9809078a1))
* **api:** manual updates ([78f9507](https://github.com/imagekit-developer/imagekit-nodejs/commit/78f9507314187a0a925eb095168caa5759b7d42b))
* **api:** manual updates ([af5fd2f](https://github.com/imagekit-developer/imagekit-nodejs/commit/af5fd2f465f9d00d4822e1fac77cbe323094bd33))
* **api:** manual updates ([2ac7656](https://github.com/imagekit-developer/imagekit-nodejs/commit/2ac76564b2119db0d9d4eddb399ddf422ecc6eba))
* **api:** manual updates ([d208673](https://github.com/imagekit-developer/imagekit-nodejs/commit/d208673da821f783d8279d6eb22bfe1e41ee4f62))
* **api:** manual updates ([76f3ed7](https://github.com/imagekit-developer/imagekit-nodejs/commit/76f3ed799e69105013d849c0d94de6778ab4da7a))
* **api:** manual updates ([01bdaa0](https://github.com/imagekit-developer/imagekit-nodejs/commit/01bdaa02fe0d6a5d5fcdca09edd31d4562031ca7))
* **api:** manual updates ([9d913fa](https://github.com/imagekit-developer/imagekit-nodejs/commit/9d913fa2de488eed9e5be5d4ec10b5ad83335c62))
* **api:** manual updates ([dc932e3](https://github.com/imagekit-developer/imagekit-nodejs/commit/dc932e36e7d79742e2d1d39a8a4aaa7b667b85c1))
* **api:** manual updates ([50c8520](https://github.com/imagekit-developer/imagekit-nodejs/commit/50c8520ab96f5e96dcb50ca3964be1f21acd1dec))
* **api:** manual updates ([1d0423a](https://github.com/imagekit-developer/imagekit-nodejs/commit/1d0423a6b3866f9ad2cf65a09d0e9f902930c37e))
* **api:** manual updates ([64fc454](https://github.com/imagekit-developer/imagekit-nodejs/commit/64fc45473e4072df18cff73024bcd4469258bf65))
* **api:** manual updates ([f70d1c2](https://github.com/imagekit-developer/imagekit-nodejs/commit/f70d1c2fc248efb16b990e047796bf7aab5387c4))
* **api:** manual updates ([4efbfee](https://github.com/imagekit-developer/imagekit-nodejs/commit/4efbfee0ca0de866a0ad77c607d7d6fb14a05c84))
* **api:** manual updates ([174eee8](https://github.com/imagekit-developer/imagekit-nodejs/commit/174eee861dac548093cc6b561eb59496cb5539cb))
* **api:** manual updates ([1b740df](https://github.com/imagekit-developer/imagekit-nodejs/commit/1b740dfb1e21293568614f5a7fe96468762f5286))
* **api:** manual updates ([636a5a9](https://github.com/imagekit-developer/imagekit-nodejs/commit/636a5a991e4e648da2d183a6492e9a959938b2ec))
* **api:** manual updates ([c1bc59b](https://github.com/imagekit-developer/imagekit-nodejs/commit/c1bc59ba35af6b0e7bac82e1e87e3937eda72cf1))
* **api:** manual updates ([4d7286a](https://github.com/imagekit-developer/imagekit-nodejs/commit/4d7286a5b61168b8bccd44e2cf754938e63c8568))
* **api:** manual updates ([8986981](https://github.com/imagekit-developer/imagekit-nodejs/commit/898698108afffb5ecffda06765b7c02c21f2e74c))
* **api:** manual updates ([693e3cf](https://github.com/imagekit-developer/imagekit-nodejs/commit/693e3cf68ccd5a8de740ed35b9d0cc2660e88521))
* **api:** manual updates ([ace1909](https://github.com/imagekit-developer/imagekit-nodejs/commit/ace190977c46f6702597fb4d6ea54133346724a2))
* **api:** remove Stainless attribution from readme ([454c722](https://github.com/imagekit-developer/imagekit-nodejs/commit/454c7225ad3fbfda4f6807a0655b5d0b430b16d8))
* **api:** update api docs link ([34d2eb1](https://github.com/imagekit-developer/imagekit-nodejs/commit/34d2eb1c9de598e7f01156588a8f942dc36f8a70))
* **api:** Update env var name ([70c98e0](https://github.com/imagekit-developer/imagekit-nodejs/commit/70c98e08925b1884713e524129227003af75c7b6))
* **docs:** add URL generation examples and authentication parameters to README ([7a2bc8f](https://github.com/imagekit-developer/imagekit-nodejs/commit/7a2bc8f71d50a730fa7ebf634d2775c30d21171f))
* **docs:** improve descriptions for private API key and password fields in client settings ([7ab6b37](https://github.com/imagekit-developer/imagekit-nodejs/commit/7ab6b37f00f0b4ecba52bd4814370d22c5264c7e))
* **helper:** implement getAuthenticationParameters method and test cases ([297bb95](https://github.com/imagekit-developer/imagekit-nodejs/commit/297bb95dabb0ed878bd009e1878b418ed26bf31e))
* implement serializeUploadOptions function for upload option serialization and add tests ([cfce32f](https://github.com/imagekit-developer/imagekit-nodejs/commit/cfce32f9b706a52035714714dcbc8429e4072f04))
* remove password field from ImageKit client initialization in tests and documentation ([08a5744](https://github.com/imagekit-developer/imagekit-nodejs/commit/08a5744777862dcb8b156ed47b31865db2c9f837))
* **tests:** add test for transformationPosition as path in signed URL generation ([2f37641](https://github.com/imagekit-developer/imagekit-nodejs/commit/2f37641776756aaae377c802f46e2ee6349127eb))
* **tests:** add tests for transformation handling with absolute URLs and non-default endpoints ([188eeee](https://github.com/imagekit-developer/imagekit-nodejs/commit/188eeee3b77d7e3a89e8c5abad4e0fef0ca9107f))
* update README to enhance SDK description and usage examples ([e1e5abf](https://github.com/imagekit-developer/imagekit-nodejs/commit/e1e5abf48ffd9845a359082aa0b8ef10adeb7b7f))
* **webhooks:** use toBase64 for webhook key in verification ([433eb44](https://github.com/imagekit-developer/imagekit-nodejs/commit/433eb44c54f3211d1b80aa97935a705ce7968a8a))
* **webhooks:** use toBase64 for webhook key in verification ([3d0571d](https://github.com/imagekit-developer/imagekit-nodejs/commit/3d0571dbe9fa9cdd04f23a2f6d56a49005596649))


### Bug Fixes

* 24 ([5610765](https://github.com/imagekit-developer/imagekit-nodejs/commit/56107650b674572551057c3788e0857ece5e5e7c))
* add repository details for package ([b9e4231](https://github.com/imagekit-developer/imagekit-nodejs/commit/b9e423142ab909ce9f0034e73d26c6d350ade4da))
* added folder object in ListFileResponse ([#106](https://github.com/imagekit-developer/imagekit-nodejs/issues/106)) ([bfcfbb9](https://github.com/imagekit-developer/imagekit-nodejs/commit/bfcfbb9ed2c82aea7284ed6841d3a92afd2fb0da))
* coerce nullable values to undefined ([66e3b81](https://github.com/imagekit-developer/imagekit-nodejs/commit/66e3b81cc8d6a1a123c0622c08801ecbdeef4f9f))
* correct SDK description in package.json ([f5d2713](https://github.com/imagekit-developer/imagekit-nodejs/commit/f5d2713a54e1f0a1fc3c1c36546a7ad5d3f6783f))
* **docs:** add missing commas in URL generation examples for clarity ([21caa93](https://github.com/imagekit-developer/imagekit-nodejs/commit/21caa9336a890568790d5b2bb49c274ed2434c4e))
* **package:** removed unnecessary types and install-types package ([a254d4b](https://github.com/imagekit-developer/imagekit-nodejs/commit/a254d4b5f5cef576fba3499d77cafc13b521f7bb))
* update privateAPIKey to privateKey in code and tests ([2f93b89](https://github.com/imagekit-developer/imagekit-nodejs/commit/2f93b891233782e8f6af350905a979f683173458))
* updated signed url generations for urls with symbols and unicode characters ([#102](https://github.com/imagekit-developer/imagekit-nodejs/issues/102)) ([5e264de](https://github.com/imagekit-developer/imagekit-nodejs/commit/5e264dedf6b5fbc9e98b66e715726eb7b2b1cfba))
* **webhooks:** revert toBase64 conversion for webhook key ([13c716e](https://github.com/imagekit-developer/imagekit-nodejs/commit/13c716e35e73c8ad79157b818ac93b45365be8f3))


### Chores

* bumped package version to 6.0.0 ([85c7ef3](https://github.com/imagekit-developer/imagekit-nodejs/commit/85c7ef34f4c624d3b292ffe4115718607ec1e98d))
* ci build action ([06a9882](https://github.com/imagekit-developer/imagekit-nodejs/commit/06a988278c597a54f8d7e7b5c23d62cfae4079b7))
* do not install brew dependencies in ./scripts/bootstrap by default ([69968b1](https://github.com/imagekit-developer/imagekit-nodejs/commit/69968b160ccf3e4dbd68a6356714d75dd0d63acb))
* **esm:** Improved Support for ES Modules ([5a4127f](https://github.com/imagekit-developer/imagekit-nodejs/commit/5a4127fb4c3b6c7d007043cf51d3c0687ef68ac0))
* lint and format fix ([788885c](https://github.com/imagekit-developer/imagekit-nodejs/commit/788885c3cc5e8834105ec2b0b8ed28ac747b0b1a))
* sync repo ([3b95a96](https://github.com/imagekit-developer/imagekit-nodejs/commit/3b95a962395d62aee0c8133efce3bc863a0332bf))
* update SDK settings ([9ea85e3](https://github.com/imagekit-developer/imagekit-nodejs/commit/9ea85e33b6484aa6a62c178c51d9522756750297))
* **workflow:** added node 16 and 18 to test suite ([ef277ca](https://github.com/imagekit-developer/imagekit-nodejs/commit/ef277ca3e3f7d3801d9ea7a54929a9cd47837134))


### Documentation

* update to make it more readable ([ed5ff38](https://github.com/imagekit-developer/imagekit-nodejs/commit/ed5ff38d6d9576a70c8115d9ed1e54f537277d8a))


### Refactors

* enhance README for clarity and detail on SDK features ([569545c](https://github.com/imagekit-developer/imagekit-nodejs/commit/569545c17e7ccf80cffcbe1ef847a70e4f3d07d9))
* **helper:** remove console error logging in Helper class ([cc1a4c0](https://github.com/imagekit-developer/imagekit-nodejs/commit/cc1a4c0d915a9dfc6b1156f578fb1e713f965c2e))
* **tests:** remove redundant helper tests ([ef30e9c](https://github.com/imagekit-developer/imagekit-nodejs/commit/ef30e9c65b9259bbc5bef259a565789c1502dae8))
* **tests:** remove unused imports from URL generation test files ([2e7211e](https://github.com/imagekit-developer/imagekit-nodejs/commit/2e7211e34f56a45e909db054a5dc739dc824d6e4))
* **tests:** update URL generation test to include new aiEdit transformation parameter ([a18331d](https://github.com/imagekit-developer/imagekit-nodejs/commit/a18331d25a731109106a8e7c5c63a884e851d854))
* **transformation-utils:** replace safeBtoa implementation with toBase64 utility; update overlay tests for consistency ([e4adc14](https://github.com/imagekit-developer/imagekit-nodejs/commit/e4adc14a0662f9782665bdff8865229819618995))
