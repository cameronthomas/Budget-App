var React = require('react')
var CreateReactClass = require('create-react-class')
var MasterLayout = CreateReactClass({
  render: function() {
    return(
      <html>
        <head>
          <title>;aksdfj</title>
        </head>
        <body>
          {this.props.children}
        </body>
      </html>
    )
  }
})

module.exports = MasterLayout
