import {reactive} from "vue";

export const sellContentList = reactive([
    {
        id: 1,
        stuff: '二手兰博基尼',
        images: 'https://th.bing.com/th/id/R.5aa37eeed734f12f31d59c3d93d8d6a8?rik=p3fOpsiri6IDnA&riu=http%3a%2f%2foss.sandazuche.com%2fadmin%2f20170316%2f58ca56db35ed7.jpg&ehk=foAc%2fNtDcGE9VAxgbU6bHtFBeVmOCCORgsgM5xNMbKA%3d&risl=&pid=ImgRaw&r=0',
        poster: 'qq:12345678',
        avatar_url: 'https://avatars.githubusercontent.com/u/77684181?s=96&v=4',
        price: 120000,
    },
    {
        id: 2,
        stuff: '《塞尔达·王国之泪》卡带',
        images: 'https://media.9game.cn/gamebase/ieu-gdc-pre-process/images/20230519/10/10/1d5cd98e677a390ccaacbfb454b48f45.jpg',
        poster: 'qq:9947383743',
        avatar_url: 'https://image-attachment.oss-cn-beijing.aliyuncs.com/data/www/html/uc_server/data/avatar/002/37/19/19_avatar_middle.jpg?v=',
        price: 300,
    }
])