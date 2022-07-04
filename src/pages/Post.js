import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import '../assests/Post.css'
import loading from '../assests/loading.gif'

const Post = () => {
    const { id } = useParams();

    const [Post, setPost] = useState([])

    useEffect(() => {
        getPost()
    }, [])

    let getPost = async () => {
        let response = await fetch(`/api/get-posts/${id}`)
        let data = await response.json()
        setPost(data)
    }

    const [Like, setLike] = useState(false);
    
    function LikeIt() {
        if (! Like) {
            document.getElementById("likeit").style = "color: rgb(28, 156, 253);"
            setLike(true);
        }
        else {
            document.getElementById("likeit").style = "color: white;"
            setLike(false);
        }
    }

    return (
        <>
            <div className="main-post-container">
                <div className="post-div">
                    <div className="header">
                        <p><span className="bold bg-blue">Title:</span> {Post.post_title}</p>
                        <p><span className="bold bg-blue">Description:</span> {Post.post_description}</p>
                    </div>

                    <div className="image-div">
                        {Post.post_image? <img src={Post.post_image} className="post-img" alt="post" /> :
                        <img src={loading} className="loading-gif" alt="loading" />}
                    </div>

                    <div className="footer">
                        <div className="flex-footer">
                            <div className="like-div">
                                <span className="post-info like-div"><i className="fa fa-thumbs-up bg-blue"></i> 140 Likes</span>

                            </div>

                            <div className="comment-div">
                                <button className="like-btn" onClick={LikeIt} id="likeit">
                                    <span className="text-center"><i className="fa fa-thumbs-up"></i> Like</span>
                                </button>
                            </div>
                        </div>

                    </div>

                </div>
            </div>
        </>
    )
}

export default Post
