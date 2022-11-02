import utilStyles from '../styles/util.module.scss'

export default function About() {
  return (
    <div className={utilStyles.container}>
      <h1>Fav Sensei!</h1>
      <h1>好きこそものの上手なれ　〜お気にを先生に〜</h1>
      <p>Fav Senseiはお気に入りのコンテンツを教材にし、学習を管理するためのアプリです。あなたのお気にはなんですか？</p>
      <h2>こんなの欲しかった5つの機能</h2>
      <h3>First Take　〜失敗はご褒美〜</h3>
      <p>Fav Senseiは学習の過程も大切にします。第二言語を学習するならなおさら。ここに失敗を笑う人はいません。まずは現状を受け入れましょう。改善はそれからです。</p>
      <p>Fav Senseiは学習のアウトプット履歴を管理します。「何度も間違えてしまうもの」を重点的に克服しましょう。その積み重ねがいつかあなたの大きな財産になるでしょう。</p>
      <img alt="slam dunk" src="/images/slam-dunk.jpg" />
    </div>
  )
}
