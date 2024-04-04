import React, { useEffect, useState } from "react";
import "./Home.css";
import {
  collection,
  deleteDoc,
  doc,
  getDocs,
  orderBy,
  query,
} from "firebase/firestore";
import { auth, db } from "../firebase";
import dayjs from "dayjs";

const Home = () => {
  const [postList, setPostList] = useState([]);

  useEffect(() => {
    const getPosts = async () => {
      const dataTemp = collection(db, "posts");
      const q = query(dataTemp, orderBy("time", "desc"));
      const data = await getDocs(q);
      setPostList(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    };
    getPosts();
  }, []);

  const handleDelete = async (id) => {
    await deleteDoc(doc(db, "posts", id));
    window.location.href = "/";
  };
  return (
    <div className="homePage">
      {postList.map((post) => {
        return (
          <div className="postContents" key={post.id}>
            <div className="postHeader">
              <h1>{post.title}</h1>
            </div>
            <div className="postTextContainer">{post.postsText}</div>
            <div className="postingTime">
              <h5>{dayjs(post.time.toDate()).format("YYYY/MM/DD a hh:mm")}</h5>
            </div>
            <div className="nameAndDeleteButton">
              <h3>{post.author.username}</h3>
              {post.author.id === auth.currentUser?.uid && (
                <button
                  onClick={() => {
                    handleDelete(post.id);
                  }}
                >
                  削除
                </button>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Home;
