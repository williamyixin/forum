package main

import (
	"cloud.google.com/go/firestore"
	"context"
	"firebase.google.com/go/v4"
	"fmt"
	"google.golang.org/api/iterator"
	"log"
	"net/http"

	"google.golang.org/api/option"
)

var ctx context.Context
var client *firestore.Client

func homePage(w http.ResponseWriter, r *http.Request){
	fmt.Fprintf(w, "Welcome to the HomePage!")
	fmt.Println("Endpoint Hit: homePage")
}

func putTest(w http.ResponseWriter, r *http.Request) {
	//_, err := client.Collection("topics").Doc("Interstellar").Set(ctx, map[string]interface{}{
	//	"name": "Interstellar",
	//	"releaseDate":  2014,
	//})
	//
	//_ ,_ , err = client.Collection("topics").Doc("Interstellar").Collection("Comments").Add(ctx, map[string]interface{}{
	//	"creator": "williamyixin",
	//	"date": 2020,
	//	"content": "wowowowowie i like",
	//	"upvotes": 10000,
	//	"downvotes": -1209,
	//
	//})

	_ ,_ , err := client.Collection("topics").Doc("Interstellar").Collection("Comments").Doc("qtg_sDwQMIerTiFmPaeLP_77-XqtKojZZrQYl2pbpNI").Collection("Comments").Add(ctx, map[string]interface{}{
		"creator": "williamyixin",
		"date": 2020,
		"content": "i don't like",
		"upvotes": 10000,
		"downvotes": -1209,

	})
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
		fmt.Println(doc.Data())
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