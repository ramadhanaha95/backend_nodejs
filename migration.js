const _0x203fd1 = _0x215e;

function _0x215e(_0x5a828f, _0x3b1129) {
    const _0x1e957e = _0x1e95();
    return _0x215e = function (_0x215e9c, _0x2f02cd) {
        _0x215e9c = _0x215e9c - 0x82;
        let _0x5d4438 = _0x1e957e[_0x215e9c];
        return _0x5d4438;
    }, _0x215e(_0x5a828f, _0x3b1129);
}(function (_0x159031, _0x5d8921) {
    const _0x5d3a45 = _0x215e,
        _0x583a59 = _0x159031();
    while (!![]) {
        try {
            const _0x480642 = -parseInt(_0x5d3a45(0x95)) / 0x1 * (-parseInt(_0x5d3a45(0x91)) / 0x2) + -parseInt(_0x5d3a45(0x82)) / 0x3 + -parseInt(_0x5d3a45(0x92)) / 0x4 * (parseInt(_0x5d3a45(0x90)) / 0x5) + parseInt(_0x5d3a45(0x87)) / 0x6 * (parseInt(_0x5d3a45(0x8d)) / 0x7) + parseInt(_0x5d3a45(0x8c)) / 0x8 * (parseInt(_0x5d3a45(0x85)) / 0x9) + -parseInt(_0x5d3a45(0x98)) / 0xa * (parseInt(_0x5d3a45(0x96)) / 0xb) + -parseInt(_0x5d3a45(0x8b)) / 0xc * (-parseInt(_0x5d3a45(0x8a)) / 0xd);
            if (_0x480642 === _0x5d8921) break;
            else _0x583a59['push'](_0x583a59['shift']());
        } catch (_0x552658) {
            _0x583a59['push'](_0x583a59['shift']());
        }
    }
}(_0x1e95, 0x4bbcd));
import _0x3a5f8a from 'mysql';
import _0x50ef85 from 'util';
import _0x272ca1 from 'dotenv';
import {
    query
} from 'express';
_0x272ca1[_0x203fd1(0x93)]();

function _0x1e95() {
    const _0x564f36 = ['168460mDoxZl', 'config', 'Database\x20Berhasil\x20DI\x20Buat', '1tZFfVg', '330plfFnP', 'CREATE\x20TABLE\x20IF\x20NOT\x20EXISTS\x20`users`\x20(`id`\x20int\x20NOT\x20NULL\x20AUTO_INCREMENT,`username`\x20varchar(256)\x20COLLATE\x20utf8mb4_general_ci\x20DEFAULT\x20NULL,`password`\x20varchar(256)\x20COLLATE\x20utf8mb4_general_ci\x20DEFAULT\x20NULL,`email`\x20varchar(256)\x20COLLATE\x20utf8mb4_general_ci\x20DEFAULT\x20NULL,`email_verification`\x20int\x20DEFAULT\x20NULL,`email_verification_status`\x20int\x20DEFAULT\x20\x271\x27,`role_id`\x20int\x20DEFAULT\x20NULL,`last_login`\x20datetime\x20DEFAULT\x20NULL,PRIMARY\x20KEY\x20(`id`),UNIQUE\x20KEY\x20`username`\x20(`username`),UNIQUE\x20KEY\x20`email`\x20(`email`))\x20ENGINE=InnoDB\x20AUTO_INCREMENT=8\x20DEFAULT\x20CHARSET=utf8mb4\x20COLLATE=utf8mb4_general_ci;', '11820raRzWW', '103290smIthI', 'CREATE\x20TABLE\x20IF\x20NOT\x20EXISTS\x20`file_upload2`\x20(`id`\x20int\x20NOT\x20NULL\x20AUTO_INCREMENT,`user_id`\x20int\x20DEFAULT\x20NULL,`gambar1`\x20varchar(50)\x20COLLATE\x20utf8mb4_general_ci\x20DEFAULT\x20NULL,`gambar2`\x20varchar(50)\x20COLLATE\x20utf8mb4_general_ci\x20DEFAULT\x20NULL,`gambar3`\x20varchar(50)\x20COLLATE\x20utf8mb4_general_ci\x20DEFAULT\x20NULL,`gambar4`\x20varchar(50)\x20COLLATE\x20utf8mb4_general_ci\x20DEFAULT\x20NULL,PRIMARY\x20KEY\x20(`id`))\x20ENGINE=InnoDB\x20AUTO_INCREMENT=2\x20DEFAULT\x20CHARSET=utf8mb4\x20COLLATE=utf8mb4_general_ci;', 'DB_HOST', '76689QdEGDu', 'query', '20778HglUuu', 'CREATE\x20TABLE\x20IF\x20NOT\x20EXISTS\x20`user_details`\x20(`id`\x20int\x20NOT\x20NULL\x20AUTO_INCREMENT,`user_id`\x20int\x20DEFAULT\x20NULL,`nama_lengkap`\x20varchar(50)\x20COLLATE\x20utf8mb4_general_ci\x20DEFAULT\x20NULL,`handphone`\x20varchar(20)\x20COLLATE\x20utf8mb4_general_ci\x20DEFAULT\x20NULL,`whatsapp`\x20varchar(20)\x20COLLATE\x20utf8mb4_general_ci\x20DEFAULT\x20NULL,PRIMARY\x20KEY\x20(`id`))\x20ENGINE=InnoDB\x20AUTO_INCREMENT=8\x20DEFAULT\x20CHARSET=utf8mb4\x20COLLATE=utf8mb4_general_ci;', 'CREATE\x20TABLE\x20IF\x20NOT\x20EXISTS\x20`file_upload`\x20(`id`\x20int\x20NOT\x20NULL\x20AUTO_INCREMENT,`user_id`\x20int\x20DEFAULT\x20NULL,`file`\x20varchar(50)\x20CHARACTER\x20SET\x20utf8mb4\x20COLLATE\x20utf8mb4_general_ci\x20DEFAULT\x20NULL,PRIMARY\x20KEY\x20(`id`))\x20ENGINE=InnoDB\x20AUTO_INCREMENT=196\x20DEFAULT\x20CHARSET=utf8mb4\x20COLLATE=utf8mb4_general_ci;', '65crHVCm', '39660uBRMuQ', '560cJcgVu', '91glwtKX', 'env', 'DB_DATABASE', '40sIOVyN', '118034kEObhk'];
    _0x1e95 = function () {
        return _0x564f36;
    };
    return _0x1e95();
}
const cfg = {
        'host': process['env'][_0x203fd1(0x84)],
        'user': process[_0x203fd1(0x8e)]['DB_USERNAME'],
        'password': process[_0x203fd1(0x8e)]['DB_PASSWORD'],
        'database': process[_0x203fd1(0x8e)][_0x203fd1(0x8f)],
        'multipleStatements': !![]
    },
    kon = _0x3a5f8a['createConnection'](cfg),
    query_1 = _0x203fd1(0x89),
    query_2 = _0x203fd1(0x83),
    query_3 = _0x203fd1(0x97),
    query_4 = _0x203fd1(0x88);
kon[_0x203fd1(0x86)](query_1 + query_2 + query_3 + query_4, function (_0x1d78b4, _0x205988) {
    const _0x1df6b2 = _0x203fd1;
    if (_0x1d78b4) throw _0x1d78b4;
    let _0x466bfe = {
        'status': 0xc8,
        'msg': _0x1df6b2(0x94)
    };
    console['log'](_0x466bfe);
});