
var React = require('react')
var CreateReactClass = require('create-react-class');
var defaultlayout = require("./layout/master")

var IndexComponent = CreateReactClass({
  render: function() {
    return(
      <defaultlayout>
        <div>
          {this.props.name}
        </div>
      </defaultlayout>
      )
    }
  }
)

module.exports = IndexComponent
