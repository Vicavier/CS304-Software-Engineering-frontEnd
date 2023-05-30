import {reactive} from "vue";

export const EssayContentList = reactive([
    {
        cnt: 1,
        id: 1,
        user_id: 32132131,
        title: '母猪的产后护理',
        tags: ['科技','动物'],
        likes: 114,
        cover: 'https://img.zhuwang.cc/2020/1130/20201130015554310.png',
        is_anonymous: Boolean,
        content: '常言道：今天的辛勤付出是为了明日更好的收获。母猪繁育无小事，各个环节都容不得三心二意，诸如题主所说的母猪产后护理，做的好不但能防止子宫内膜炎等疾病 …\n' +
            '眼下大小猪价格皆',
    },
    {
        cnt: 1,
        id: 2,
        user_id: 32132131,
        title: '高等元素论',
        tags: ['化学'],
        likes: 233,
        cover: 'https://pic2.zhimg.com/50/v2-0b7c25ce56a5bf5580961769cc1b961c_hd.jpg?source=1940ef5c',
        is_anonymous: Boolean,
        content: '666',
    }
])