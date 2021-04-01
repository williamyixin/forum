import React from "react";
import Card from 'react-bootstrap/Card';

// Converts username into username color
function stringToColor(str) {
  var hash = 0;
  for (var i = 0; i < str.length; i++) {
    hash = str.charCodeAt(i) + ((hash << 5) - hash);
  }
  var colour = '#';
  for (var i = 0; i < 3; i++) {
    var value = (hash >> (i * 8)) & 0xFF;
    colour += ('00' + value.toString(16)).substr(-2);
  }
  return colour;
}

export default class Comment extends React.Component {
  constructor(props) {
    super(props);
    this.state = { 
      loading: true
     };
  }

  render() {
    return (
      <div>
        <Card bg={'light'} style={{margin: '40px', borderWidth: '0', maxWidth: '75%'}}>
          <Card.Body style={{backgroundColor:'#E5EBEB', borderRadius: 10, padding: '0px'}}>
            
            <div style={{display:'flex', flexDirection:'row', alignItems: 'flex-start', position:'relative', bottom:'10px', right: '10px'}}>
              <div style={{height: '30px', width: '30px', backgroundColor: stringToColor(this.props.creator), borderRadius: '50%', marginRight: '15px'}}></div>
              <Card.Title style={{color:'#5293D3'}}>{this.props.creator}</Card.Title>
            </div>

            <Card.Text>
              <div style={{color: '#465B71', marginLeft: '20px', marginRight: '20px'}}>
                {this.props.content}
              </div>

              <div style={{display:'flex', flexDirection:'row', justifyContent: 'space-between', float:'right', marginRight:'30px'}}>
                <Card.Link href="#">upvote <b>{this.props.upvotes}</b></Card.Link>
                <Card.Link href="#">downvote <b>{this.props.downvotes}</b></Card.Link>
                <Card.Link href="#">reply</Card.Link>
              </div>
            </Card.Text>

          </Card.Body>
        </Card>
      </div>
    );
  }
}
