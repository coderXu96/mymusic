export class NEWMUSIC {
  
  constructor(id,picUrl,songName,aliasName = '',artists,){
    // 音乐id
    this.id = id
    // 图片
    this.picUrl = picUrl
    // 歌曲名称
    this.songName = songName
    // 歌曲描述
    this.aliasName = aliasName
    // 歌手名称
    this.artists = artists
  }
}