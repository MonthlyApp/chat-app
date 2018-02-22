import React from 'react'
import ReactDOM from 'react-dom'
import PropTypes from 'prop-types'
import {Card, CardActions, CardHeader, CardText} from 'material-ui/Card'
import FlatButton from 'material-ui/FlatButton'
import baseTheme from 'material-ui/styles/baseThemes/lightBaseTheme'
import getMuiTheme from 'material-ui/styles/getMuiTheme'
import injectTapEventPlugin from 'react-tap-event-plugin'
//injectTapEventPlugin()


// カードコンポーネントを定義
class CardExampleExpandable extends React.Component {
  // コンストラクタ
  constructor(props) {
    super(props)
  }

  // テーマを指定
  getChildContext() {
    return { muiTheme: getMuiTheme(baseTheme) }
  }

  // DOMをレンダリング
  render() {
    return (
      // カードコンポーネントのDOM
      <Card>
        // ヘッダー
        <CardHeader
          title="Rails 5.1サンプルアプリ開発"
          subtitle="Rails 5.1を体感する為のサンプルアプリケーションを開発する。"
          actAsExpander={true}
          showExpandableButton={true}
        />
        // アクション
        <CardActions>
          <FlatButton label="完了" />
          <FlatButton label="中止" />
        </CardActions>
        // テキスト
        <CardText expandable={true}>
          ・Rails 5.1より採用されたyarn,webpackを用いる<br/>
          ・Reactを採用しReactベースのMaterial-UIを入れてみる
        </CardText>
      </Card>
    )
  }
}

// テーマを指定
CardExampleExpandable.childContextTypes = {
  muiTheme: PropTypes.object.isRequired
}

// DOMロード後に指定したDOMを追加
document.addEventListener('DOMContentLoaded', () => {
  // CardExampleExpandableをレンダリング
  ReactDOM.render(
    <CardExampleExpandable />,
    document.body.appendChild(document.createElement('div')),
  )
})
