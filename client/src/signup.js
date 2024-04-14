import React, { useState } from 'react';

const SignUpPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    workField: '',
    qualifications: '',
    recentWork: '',
    experience: '',
    proofs: [],
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);
    setFormData({ ...formData, proofs: [...formData.proofs, ...files] });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Implement your submission logic here
    console.log(formData);
    // Reset form data after submission
    setFormData({
      name: '',
      email: '',
      workField: '',
      qualifications: '',
      recentWork: '',
      experience: '',
      proofs: [],
    });
  };

  return (
    <div className="signup-container">
      <h2>Sign Up</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="name">Name:</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
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
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default SignUpPage;