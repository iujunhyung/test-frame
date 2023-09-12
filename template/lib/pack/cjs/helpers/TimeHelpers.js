'use strict';

exports.TimeHelpers = void 0;
(function (TimeHelpers) {
    function getAgo(at) {
        const now = new Date(); // 현재 시간
        const diffInMilliseconds = now.getTime() - at.getTime(); // 현재 시간과 주어진 시간 간의 차이 (밀리초)
        // 시간 변환 기준 설정 (밀리초 단위)
        const minuteInMilliseconds = 60 * 1000;
        const hourInMilliseconds = 60 * minuteInMilliseconds;
        const dayInMilliseconds = 24 * hourInMilliseconds;
        // 시간 변환 로직
        if (diffInMilliseconds < minuteInMilliseconds) {
            const diffInSeconds = Math.floor(diffInMilliseconds / 1000);
            return `${diffInSeconds}초 전`;
        }
        else if (diffInMilliseconds < hourInMilliseconds) {
            const diffInMinutes = Math.floor(diffInMilliseconds / minuteInMilliseconds);
            return `${diffInMinutes}분 전`;
        }
        else if (diffInMilliseconds < dayInMilliseconds) {
            const diffInHours = Math.floor(diffInMilliseconds / hourInMilliseconds);
            return `${diffInHours}시간 전`;
        }
        else {
            const diffInDays = Math.floor(diffInMilliseconds / dayInMilliseconds);
            return `${diffInDays}일 전`;
        }
    }
    TimeHelpers.getAgo = getAgo;
})(exports.TimeHelpers || (exports.TimeHelpers = {}));
