import React from "react";
import Header from "./Header";
import Title from "./Title";
import CommentTree from "./CommentTree";
import StartPost from "./StartPost";
import Card from 'react-bootstrap/Card';

export default class Page extends React.Component {

  constructor(props) {
    super(props);
    this.jsontest = {
      "comments": [
          {
              "topic": "Interstellar",
              "creator": "happybanditman",
              "path": "Interstellar/qtg_sDwQMIerTiFmPaeLP_77-XqtKojZZrQYl2pbpNI",
              "upvotes": 2500,
              "downvotes": 100,
              "score": 2400,
              "content": "That moment when they realize that the person who died on the water planet had probably only died minutes ago, that was something I had never considered until I heard them say it. That was a big oh shit moment for me",
              "comments" :[
                  {
                      "topic": "Interstellar",
                      "creator": "natedoggcata",
                      "path": "Interstellar/qtg_sDwQMIerTiFmPaeLP_77-XqtKojZZrQYl2pbpNI/-enTTbkVvfarH8ybfSZ_Ow9aHib_YkJaEfmWt67IHVo",
                      "upvotes": 2500,
                      "downvotes": 100,
                      "score": 2400,
                      "content": "You actually see it happening also. There was a shot as they are landing looking down from the sky and you see something crash into the water.",
                      "comments" :[
                          {
                              "topic": "Interstellar",
                              "creator": "InflatableBombshelte",
                              "path": "Interstellar/qtg_sDwQMIerTiFmPaeLP_77-XqtKojZZrQYl2pbpNI/-enTTbkVvfarH8ybfSZ_Ow9aHib_YkJaEfmWt67IHVo",
                              "upvotes": 2500,
                              "downvotes": 100,
                              "score": 2400,
                              "content": "Wow really? Nice catch there Dogg.",
                              "comments" :[]
                          },
                          {
                              "topic": "Interstellar",
                              "creator": "carvlife",
                              "path": "[to be generated]",
                              "upvotes": 159,
                              "downvotes": 2,
                              "score": 157,
                              "content": "I already wanted to see the movie again, and now I know that it's not just possible---it's necessary.",
                              "comments" :[]
                          }
                      ]
                  },
                  {
                      "topic": "Interstellar",
                      "creator": "thesecondkira",
                      "path": "[to be generated]",
                      "upvotes": 159,
                      "downvotes": 2,
                      "score": 157,
                      "content": "It's one of the plot holes I can't rationalize away. They knew two things about the planet. (1) Time moves much slower, so much so that only two hours might have passed since the Lazurus program started. (2) The astronaut was reporting good stats. No one put together the fact that this data might be premature or at least really, really untested?",
                      "comments" :[]
                  },
                  {
                      "topic": "Interstellar",
                      "creator": "thesecondkira",
                      "path": "[to be generated]",
                      "upvotes": 159,
                      "downvotes": 2,
                      "score": 157,
                      "content": "So why did they go there in the first place? Wouldn't they have known she'd be down for just a few minutes and would have had no time to do the research they were going there for??",
                      "comments" :[]
                  }
  
              ]
              
          },
          {
              "topic": "Interstellar",
              "creator": "shiny_dunsparce",
              "path": "[to be generated]",
              "upvotes": 159,
              "downvotes": 2,
              "score": 157,
              "content": "The robot designs were probably the most interesting I've ever seen. We always picture them as humanoid or on wheels",
              "comments" :[]
          },
          {
              "topic": "Interstellar",
              "creator": "onelonelycarrot",
              "path": "[to be generated]",
              "upvotes": 159,
              "downvotes": 2,
              "score": 157,
              "content": "Was anyone else blown away from the wormhole scene? Just amazing to visualize it",
              "comments" :[]
          }
  
      ]
  }
  
  }

  render() {
    return (
      <div className="background">
        <Header />
        <Title />
        <StartPost />
        <Card bg={'light'} style={{margin: '40px', borderWidth: '0', maxWidth: '75%'}}>
          <Card.Body style={{backgroundColor:'#FFFFFF', borderRadius: 10, padding: '0px'}}>
           <CommentTree json={this.jsontest.comments}/>
          </Card.Body>
        </Card>
      </div>
    );
  }
}
