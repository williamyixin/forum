package main

import (
	"cloud.google.com/go/firestore"
	"context"
	"firebase.google.com/go/v4"
	"fmt"
	"github.com/google/uuid"
	"google.golang.org/api/iterator"
	"google.golang.org/api/option"
	"log"
	"net/http"
	"time"
)

var ctx context.Context
var client *firestore.Client

type Comment struct {
	Topic string
	Creator string
	Path string
	Time int64
	Content string
	Upvotes int
	Downvotes int
	Score int
	Replies []Comment
}


func homePage(w http.ResponseWriter, r *http.Request){
	fmt.Fprintf(w, "Welcome to the HomePage!")
	fmt.Println("Endpoint Hit: homePage")
}

func putTest(w http.ResponseWriter, r *http.Request) {

	uuid := uuid.NewString()
	time := time.Now()
	unixTime := time.Unix()

	comment := Comment{
		"Interstellar",
		"williamyixin",
		"Interstellar/qtg_sDwQMIerTiFmPaeLP_77-XqtKojZZrQYl2pbpNI/-enTTbkVvfarH8ybfSZ_Ow9aHib_YkJaEfmWt67IHVo",
		unixTime,
		"Nice catch Dogg.",
		10000,
		1209,
		10000 - 1209,
		nil,
	}

	ref := client.Collection("topics").Doc("Interstellar").
		Collection("Comments").Doc("qtg_sDwQMIerTiFmPaeLP_77-XqtKojZZrQYl2pbpNI")

	_, err := ref.Collection("Comments").Doc("-enTTbkVvfarH8ybfSZ_Ow9aHib_YkJaEfmWt67IHVo").
		Collection("Comments").Doc(uuid).
		Set(ctx, map[string]interface{}{
			"creator": comment.Creator,
			"path": comment.Path + "/" + uuid,
			"time": comment.Time,
			"content": comment.Content,
			"upvotes": comment.Upvotes,
			"downvotes": comment.Downvotes,
			"score": comment.Score,
		})


	//_ , err := client.Collection("topics").Doc("Interstellar").
	//	Collection("Comments").Doc("qtg_sDwQMIerTiFmPaeLP_77-XqtKojZZrQYl2pbpNI").
	//	Collection("Comments").Doc("-enTTbkVvfarH8ybfSZ_Ow9aHib_YkJaEfmWt67IHVo").
	//	Collection("Comments").Doc(uuid).
	//	Set(ctx, map[string]interface{}{
	//		"creator": comment.Creator,
	//		"path": comment.Path,
	//		"time": comment.Time,
	//		"content": comment.Content,
	//		"upvotes": comment.Upvotes,
	//		"downvotes": comment.Downvotes,
	//		"score": comment.Score,
	//})

	if err != nil {
		log.Fatalf("Failed adding alovelace: %v", err)
	}
}

func getTest(w http.ResponseWriter, r *http.Request) {
	iter := client.Collection("users").Documents(ctx)
	for {
		doc, err := iter.Next()
		if err == iterator.Done {
			break
		}
		if err != nil {
			log.Fatalf("Failed to iterate: %v", err)
		}
		fmt.Println(w,doc.Data())
	}
}



func handleRequests() {
	http.HandleFunc("/", homePage)
	http.HandleFunc("/putTest", putTest)
	http.HandleFunc("/getTest", getTest)
	log.Fatal(http.ListenAndServe(":10000", nil))
}

func main() {
	opt := option.WithCredentialsFile("./service_accounts/forum-7e971-firebase-adminsdk-e3jqe-520d6bf3c5.json")
	ctx = context.Background()
	app, err := firebase.NewApp(ctx, nil, opt)
	if err != nil {
		log.Fatalln(err)
	}

	client, err = app.Firestore(ctx)
	if err != nil {
		log.Fatalln(err)
	}

	handleRequests()

	defer client.Close()
}