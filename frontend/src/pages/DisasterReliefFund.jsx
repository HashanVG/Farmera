import React, { useState } from 'react';

const DisasterReliefFund = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    nationalId: '',
    mobileNumber: '',
    accountNumber: '',
    document: null
  });
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});

  const validate = () => {
    const newErrors = {};
    if (!formData.fullName.trim()) newErrors.fullName = 'Full name is required';
    if (!formData.nationalId.trim()) newErrors.nationalId = 'National ID is required';
    
    // Mobile number validation: 10 digits starting with 07
    const mobileRegex = /^07\d{8}$/;
    if (!formData.mobileNumber) {
      newErrors.mobileNumber = 'Mobile number is required';
    } else if (!mobileRegex.test(formData.mobileNumber)) {
      newErrors.mobileNumber = 'Must be exactly 10 digits starting with 07';
    }

    if (!formData.accountNumber.trim()) newErrors.accountNumber = "People's Bank Account number is required";
    if (!formData.document) newErrors.document = 'Please upload the disaster certificate';

    return newErrors;
  };

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === 'document') {
      setFormData({ ...formData, document: files[0] });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
    } else {
      setErrors({});
      
      const formDataToSend = new FormData();
      formDataToSend.append('type', 'Disaster Relief');
      formDataToSend.append('fullName', formData.fullName);
      formDataToSend.append('nic', formData.nationalId);
      formDataToSend.append('mobile', formData.mobileNumber);
      formDataToSend.append('bankAccount', formData.accountNumber);
      formDataToSend.append('document', formData.document);

      setLoading(true);
      try {
        const { storage, db } = await import('../firebase');
        const { ref, uploadBytes, getDownloadURL } = await import('firebase/storage');
        const { addDoc, collection, serverTimestamp } = await import('firebase/firestore');

        let documentUrl = '';
        if (formData.document) {
          const docRef = ref(storage, `subsidies/disaster/${Date.now()}_${formData.document.name}`);
          const snapshot = await uploadBytes(docRef, formData.document);
          documentUrl = await getDownloadURL(snapshot.ref);
        }

        await addDoc(collection(db, 'subsidies'), {
          type: 'Disaster Relief',
          fullName: formData.fullName,
          nic: formData.nationalId,
          mobile: formData.mobileNumber,
          bankAccount: formData.accountNumber,
          documentUrl: documentUrl,
          status: 'pending',
          createdAt: serverTimestamp()
        });

        alert('Disaster relief application submitted successfully!');
        setFormData({
          fullName: '',
          nationalId: '',
          mobileNumber: '',
          accountNumber: '',
          document: null
        });
        if (document.getElementById('document')) {
          document.getElementById('document').value = '';
        }
      } catch (error) {
        console.error('Error submitting application:', error);
        alert('An error occurred. Please try again.');
      } finally {
        setLoading(false);
      }

    }
  };


  return (
    <main className="min-h-screen pt-32 pb-16 px-6 flex flex-col items-center relative bg-cover bg-center bg-fixed" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1605000797499-95a51c5269ae?q=80&w=2071&auto=format&fit=crop')" }}>
      {/* Dark Gradient Overlay for readability */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-black/70"></div>

      <div className="relative z-10 w-full max-w-3xl">
        {/* Header Section */}
        <div className="text-center mb-10 mt-8">
          <h1 className="text-4xl md:text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-red-300 to-yellow-500 mb-4 drop-shadow-sm">
            Disaster Relief Fund
          </h1>
          <p className="text-white/90 text-lg font-medium max-w-xl mx-auto drop-shadow">
            Supporting farmers through difficult times. Submit your application below to request financial assistance for agricultural losses.
          </p>
        </div>

        {/* Glassmorphism Form Container */}
        <div className="bg-white/10 backdrop-blur-xl border border-white/20 shadow-2xl rounded-3xl p-8 md:p-10 relative overflow-hidden">
          
          {/* Decorative glowing blobs */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-red-500/20 rounded-full blur-[80px] -translate-y-1/2 translate-x-1/2 pointer-events-none"></div>
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-yellow-400/20 rounded-full blur-[80px] translate-y-1/2 -translate-x-1/2 pointer-events-none"></div>

          <form onSubmit={handleSubmit} className="space-y-7 relative z-10">
            
            {/* Full Name */}
            <div>
              <label className="block text-sm font-bold text-white mb-2 ml-1" htmlFor="fullName">
                Full Name
              </label>
              <input
                type="text"
                id="fullName"
                name="fullName"
                value={formData.fullName}
                onChange={handleChange}
                placeholder="Enter your full name"
                className="w-full px-5 py-4 bg-white/10 border border-white/20 rounded-xl text-white placeholder-white/60 focus:outline-none focus:border-yellow-400 focus:ring-1 focus:ring-yellow-400 transition-all shadow-inner"
              />
              {errors.fullName && <p className="text-red-300 text-sm mt-2 ml-1">{errors.fullName}</p>}
            </div>

            {/* Grid for NIC & Mobile */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-7">
              {/* National ID */}
              <div>
                <label className="block text-sm font-bold text-white mb-2 ml-1" htmlFor="nationalId">
                  National ID (NIC)
                </label>
                <input
                  type="text"
                  id="nationalId"
                  name="nationalId"
                  value={formData.nationalId}
                  onChange={handleChange}
                  placeholder="e.g. 199012345678"
                  className="w-full px-5 py-4 bg-white/10 border border-white/20 rounded-xl text-white placeholder-white/60 focus:outline-none focus:border-yellow-400 focus:ring-1 focus:ring-yellow-400 transition-all shadow-inner"
                />
                {errors.nationalId && <p className="text-red-300 text-sm mt-2 ml-1">{errors.nationalId}</p>}
              </div>

              {/* Mobile Number */}
              <div>
                <label className="block text-sm font-bold text-white mb-2 ml-1" htmlFor="mobileNumber">
                  Mobile Number
                </label>
                <input
                  type="tel"
                  id="mobileNumber"
                  name="mobileNumber"
                  value={formData.mobileNumber}
                  onChange={handleChange}
                  placeholder="07xxxxxxxx"
                  className="w-full px-5 py-4 bg-white/10 border border-white/20 rounded-xl text-white placeholder-white/60 focus:outline-none focus:border-yellow-400 focus:ring-1 focus:ring-yellow-400 transition-all shadow-inner"
                />
                {errors.mobileNumber && <p className="text-red-300 text-sm mt-2 ml-1">{errors.mobileNumber}</p>}
              </div>
            </div>

            {/* Peoples Bank Account */}
            <div>
              <label className="block text-sm font-bold text-white mb-2 ml-1" htmlFor="accountNumber">
                People's Bank Account Number
              </label>
              <input
                type="text"
                id="accountNumber"
                name="accountNumber"
                value={formData.accountNumber}
                onChange={handleChange}
                placeholder="Enter your People's Bank account number"
                className="w-full px-5 py-4 bg-white/10 border border-white/20 rounded-xl text-white placeholder-white/60 focus:outline-none focus:border-yellow-400 focus:ring-1 focus:ring-yellow-400 transition-all shadow-inner"
              />
              {errors.accountNumber && <p className="text-red-300 text-sm mt-2 ml-1">{errors.accountNumber}</p>}
            </div>

            {/* File Upload */}
            <div>
              <label className="block text-sm font-bold text-white mb-2 ml-1">
                Disaster Certificate (Signed by Agricultural Officer & Regional Secretary)
              </label>
              <div className="relative w-full border-2 border-dashed border-white/40 hover:border-yellow-400 rounded-xl p-8 transition-colors bg-white/5 hover:bg-white/10 text-center cursor-pointer group">
                <input
                  type="file"
                  id="document"
                  name="document"
                  onChange={handleChange}
                  className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                />
                <div className="flex flex-col items-center justify-center space-y-3 pointer-events-none">
                  <div className="w-14 h-14 rounded-full bg-white/10 flex items-center justify-center group-hover:bg-yellow-400/20 transition-colors">
                    <svg className="w-6 h-6 text-white group-hover:text-yellow-400 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
                    </svg>
                  </div>
                  {formData.document ? (
                    <span className="text-white font-semibold bg-green-500/50 px-4 py-2 rounded-full border border-green-400/50 shadow-sm">
                      {formData.document.name}
                    </span>
                  ) : (
                    <>
                      <p className="text-white font-medium text-lg">Click to browse or drag & drop</p>
                      <p className="text-white/60 text-sm">Please upload a scanned copy or clear image</p>
                    </>
                  )}
                </div>
              </div>
              {errors.document && <p className="text-red-300 text-sm mt-2 ml-1">{errors.document}</p>}
            </div>

            {/* Submit Button */}
            <div className="pt-4">
              <button
                type="submit"
                className="w-full bg-gradient-to-r from-red-500 to-yellow-500 hover:from-red-400 hover:to-yellow-400 text-white font-bold text-xl py-4 px-8 rounded-xl shadow-[0_0_20px_rgba(250,204,21,0.3)] hover:shadow-[0_0_25px_rgba(250,204,21,0.5)] transform hover:-translate-y-1 transition-all duration-300"
              >
                Submit Application
              </button>
            </div>
          </form>
        </div>
      </div>
    </main>
  );
};

export default DisasterReliefFund;
