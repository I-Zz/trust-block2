import React, { useState, useEffect, useRef } from "react";
import "./Sidebar.css";
import SidebarOption from "./SidebarOption";
import HomeIcon from "@mui/icons-material/Home";
import SearchIcon from "@mui/icons-material/Search";
import BookmarkBorderIcon from "@mui/icons-material/BookmarkBorder";
import ListAltIcon from "@mui/icons-material/ListAlt";
import PermIdentityIcon from "@mui/icons-material/PermIdentity";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import { Button } from "@mui/material";
import { TwitterContractAddress } from "./config.js";
import { ethers } from "ethers";
import Twitter from "./utils/TwitterContract.json";
function Sidebar() {
  const [showPopup, setShowPopup] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    workField: "",
    qualifications: "",
    recentWork: "",
    experience: "",
    proofs: [],
  });
  console.log(formData);

  const popupRef = useRef(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission logic here
    // Reset form data
    setFormData({
      name: "",
      email: "",
      workField: "",
      qualifications: "",
      recentWork: "",
      experience: "",
      proofs: [],
    });
    setShowPopup(false);
  };

  const handleChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const handleFileChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      proofs: Array.from(e.target.files),
    }));
  };

  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (popupRef.current && !popupRef.current.contains(event.target)) {
        setShowPopup(false);
      }
    };

    if (showPopup) {
      document.addEventListener("mousedown", handleOutsideClick);
    }

    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, [showPopup]);

  const submitFunction= async (e) => {
    if(formData.proofs.length === 0) {
      alert("Please upload at least one proof file");
      return;
    }else{
      let submission = {
        'name': formData.name,
        'email': formData.email,
        'workField': formData.workField,
        'qualifications': formData.qualifications,
        'recentWork':  formData.recentWork,
        'experience': formData.experience,
        'proofs':formData.proofs
      };
    
      try {
        const { ethereum } = window;
    
        if (ethereum) {
          const provider = new ethers.BrowserProvider(ethereum);
          const signer = await provider.getSigner();
          const TwitterContract = new ethers.Contract(
            TwitterContractAddress,
            Twitter.abi,
            signer
          );
    
          let twitterTx = await TwitterContract.submit(
            submission.name,
            submission.email,
            submission.workField,
            submission.qualifications,
            submission.recentWork,
            submission.experience,
            "submission.proofs"
          );
          console.log(twitterTx);
        } else {
          console.log("Ethereum object doesn't exist!");
        }
      } catch (error) {
        console.log("Error submitting new Post", error);
      }
      console.log(formData);
    }
    };

    const getAllSubmissions = async () => {
      try {
        const { ethereum } = window;
        if (ethereum) {
          const provider = new ethers.BrowserProvider(ethereum);
          const signer = await provider.getSigner();
          const TwitterContract = new ethers.Contract(
            TwitterContractAddress,
            Twitter.abi,
            signer
          );
  
          let allTweets = await TwitterContract.getSubmissions();
          console.log("allTweets", allTweets);
          // setPosts(getUpdatedTweets(allTweets, ethereum.selectedAddress));
        } else {
          console.log("Ethereum object doesn't exist");
        }
      } catch (error) {
        console.log(error);
      }
    };
    useEffect(() => {
      getAllSubmissions();
    }, []);
  
const handleSubmitf= async (e) => {
submitFunction();
 
};
  return (
    <div className="sidebar">
      <div className="sidebar__top">
        {/* <News className="sidebar__twitterIcon" /> */}
        <img src="trust.png" alt="Icon" />
        <h2>TrustBlock</h2>
      </div>
      <SidebarOption Icon={HomeIcon} text="Home" />
      <SidebarOption Icon={SearchIcon} text="Search" />
      <SidebarOption Icon={BookmarkBorderIcon} text="Saved Posts" />
      <SidebarOption Icon={ListAltIcon} text="Lists" />
      <SidebarOption Icon={PermIdentityIcon} text="Profile" />
      <SidebarOption Icon={MoreHorizIcon} text="More" />
      {/* Button -> Tweet */}
      <Button
        variant="outlined"
        className="sidebar__tweet"
        fullWidth
        onClick={() => setShowPopup(true)}
      >
        Share Opinion
      </Button>
      {showPopup && (
        <div className="popup-overlay">
          <div className="popup-content" ref={popupRef}>
          <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label htmlFor="name">Name:</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Full Name"
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="email">Email:</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Working Mail ID"
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="workField">Work Field:</label>
                <select
                  id="workField"
                  name="workField"
                  value={formData.workField}
                  onChange={handleChange}
                  required
                >
                  <option value="">Select Work Field</option>
                  <option value="Technology">Technology</option>
                  <option value="Politics">Politics</option>
                  <option value="Science">Science</option>
                  <option value="Finance">Finance</option>
                  <option value="Health">Health</option>
                  <option value="Sports">Sports</option>
                  <option value="Entertainment">Entertainment</option>
                  <option value="Environment">Environment</option>
                  <option value="Business">Business</option>
                  <option value="Education">Education</option>
                </select>
              </div>
              <div className="form-group">
                <label htmlFor="qualifications">Qualifications:</label>
                <select
                  id="qualifications"
                  name="qualifications"
                  value={formData.qualifications}
                  onChange={handleChange}
                  required
                >
                  <option value="">Select Qualifications</option>
                  <option value="Bachelor's Degree">Bachelor's Degree</option>
                  <option value="Master's Degree">Master's Degree</option>
                  <option value="PhD">PhD</option>
                  <option value="Diploma">Diploma</option>
                  <option value="Certification">Certification</option>
                  <option value="Associate's Degree">Associate's Degree</option>
                  <option value="High School Diploma">High School Diploma</option>
                  <option value="Professional Degree">Professional Degree</option>
                  <option value="Other">Other</option>
                </select>
              </div>
              <div className="form-group">
                <label htmlFor="recentWork">Recent Work:</label>
                <textarea
                  id="recentWork"
                  name="recentWork"
                  value={formData.recentWork}
                  onChange={handleChange}
                  placeholder="Your Previous Work Experiences "
                  required
                ></textarea>
              </div>
              <div className="form-group">
                <label htmlFor="experience">Experience:</label>
                <select
                  id="experience"
                  name="experience"
                  value={formData.experience}
                  onChange={handleChange}
                  required
                >
                  <option value="">Select Experience</option>
                  <option value="Less than 1 year">Less than 1 year</option>
                  <option value="1-3 years">1-3 years</option>
                  <option value="3-5 years">3-5 years</option>
                  <option value="5-10 years">5-10 years</option>
                  <option value="10+ years">10+ years</option>
                  <option value="I'm a beginner">I'm a beginner</option>
                </select>
              </div>
              <div className="form-group">
                <label htmlFor="proofs">Proofs:</label>
                <input
                  type="file"
                  id="proofs"
                  name="proofs"
                  accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
                  onChange={handleFileChange}
                  required
                  multiple
                />
              </div>
              <button type="submit" onClick={handleSubmitf}>Submit</button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default Sidebar;