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
	"sort"
	"strings"
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
//	Topic string
//	Creator string
//	Path string
//	Time int64
//	Content string
//	Upvotes int
//	Downvotes int
//	Score int
//	Replies []Comment

//func getReference(path string) *firestore.DocumentRef{
//	path = "Interstellar/qtg_sDwQMIerTiFmPaeLP_77-XqtKojZZrQYl2pbpNI/-enTTbkVvfarH8ybfSZ_Ow9aHib_YkJaEfmWt67IHVo"
//
//	splittedArray := strings.Split(path, "/")
//	ref := client.Collection("topics").Doc(splittedArray[0])
//	for i := 1; i < len(splittedArray); i++ {
//		 ref = ref.Collection("Comments").Doc(splittedArray[i])
//	}
//	testRef, _ := ref.Get(ctx)
//	m := testRef.Data()
//	fmt.Printf("Document data test: %#v\n", m)
//	testRef2, _ := client.Collection("topics").Doc("Interstellar").
//		Collection("Comments").Doc("qtg_sDwQMIerTiFmPaeLP_77-XqtKojZZrQYl2pbpNI").
//		Collection("Comments").Doc("-enTTbkVvfarH8ybfSZ_Ow9aHib_YkJaEfmWt67IHVo").Get(ctx)
//	m = testRef2.Data()
//	fmt.Printf("Document data manual: %#v\n", m)
//	return ref
//}
func makeTree(parent Comment, parString string, children []Comment) {
	for i, child := range children {
		childSplit := strings.Split(child.Path, "/")
		n := len(childSplit)

		if strings.Compare(childSplit[n - 2], parString) == 0 {
			parent.Replies = append(parent.Replies, child)
			makeTree(child, childSplit[n - 1], children[i:])
		}
	}
}

func getComments(topic string) []Comment {
	commentsIter := client.CollectionGroup("Comments").Where(
		"topic", "==", "Interstellar").Documents(ctx)
	commentDocs, _ := commentsIter.GetAll()
	var comments []Comment
	var ret []Comment
	var replies []Comment

	for _, commentDoc := range commentDocs {
		data := commentDoc.Data()

		newComment := Comment {
			Creator: data["creator"].(string),
			Path: data["path"].(string),
			Time: data["date"].(int64),
			Content: data["content"].(string),
			Upvotes: data["upvotes"].(int),
			Downvotes: data["downvotes"].(int),
			Score: data["score"].(int),
			Replies: make([]Comment, 0),
		}

		comments = append(comments, newComment)
	}

	sort.Slice(comments, func(i, j int) bool {
		splitPathI := strings.Split(comments[i].Path, "/")
		splitPathJ := strings.Split(comments[j].Path, "/")

		return len(splitPathI) < len(splitPathJ)
	})

	for _, c := range comments {
		splitPath := strings.Split(c.Path, "/")
		lenPath := len(splitPath)
		if lenPath <= 2 {
			ret = append(ret, c)
		} else {
			replies = append(replies, c)
		}
	}

	var groupedReplies [][]Comment
	for i, parent := range ret {
		parString := parent.Path
		groupedReplies = append(groupedReplies, make([]Comment, 0))

		for _, reply := range replies {
			if strings.Contains(reply.Path, parString) {
				groupedReplies[i] = append(groupedReplies[i], reply)
			}
		}
	}

	for i, p := range ret {
		pSplit := strings.Split(p.Path, "/")
		n := len(pSplit)
		makeTree(p, pSplit[n - 1], groupedReplies[i])
	}

	return ret
}


func handleRequests() {
	http.HandleFunc("/", homePage)
	http.HandleFunc("/putTest", putTest)
	http.HandleFunc("/getTest", getTest)
	log.Fatal(http.ListenAndServe(":10000", nil))
}

func main() {
	opt := option.WithCredentialsFile("./service_accounts/key.json")
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