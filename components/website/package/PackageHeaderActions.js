"use client";

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useSelector } from 'react-redux';
import { axiosNormalPost } from '@/libs/axiosHelper';
import { toggleSavePackageUrl, checkIsPackageSavedUrl } from '@/routes/serviceRoutes';
import { showMessage } from '@/libs/commonHelper';
import ShareButton from '@/components/common/ShareButton';

export default function PackageHeaderActions({ packageDetails, siteUrl }) {
  const router = useRouter();
  const { user } = useSelector((state) => state.userAuth || {});
  const [isSaved, setIsSaved] = useState(false);
  const [savingLoading, setSavingLoading] = useState(false);

  // Check if current package is saved in wishlist
  useEffect(() => {
    if (packageDetails?.id) {
      let uid = user?.id;
      if (!uid && typeof window !== 'undefined') {
        try {
          const raw = localStorage.getItem('user') || localStorage.getItem('user_details') || localStorage.getItem('userAuth');
          if (raw) uid = JSON.parse(raw)?.id;
        } catch (e) {}
      }
      if (uid) {
        axiosNormalPost(checkIsPackageSavedUrl, { user_id: uid, package_id: packageDetails.id })
          .then((res) => {
            if (res && res.status) setIsSaved(!!res.is_saved);
          })
          .catch(() => {});
      }
    }
  }, [packageDetails?.id, user]);

  const handleToggleSave = async () => {
    let uid = user?.id;
    if (!uid && typeof window !== 'undefined') {
      try {
        const raw = localStorage.getItem('user') || localStorage.getItem('user_details') || localStorage.getItem('userAuth');
        if (raw) uid = JSON.parse(raw)?.id;
      } catch (e) {}
    }

    if (!uid) {
      showMessage('Please sign in to save packages to your account wishlist & dashboard.', 'info');
      router.push('/login');
      return;
    }

    setSavingLoading(true);
    try {
      const res = await axiosNormalPost(toggleSavePackageUrl, {
        user_id: uid,
        package_id: packageDetails.id
      });
      if (res && res.status) {
        setIsSaved(res.is_saved);
        showMessage(res.msg || (res.is_saved ? 'Package saved to your wishlist!' : 'Package removed from saved list.'), res.is_saved ? 'success' : 'info');
      }
    } catch (err) {
      showMessage('Could not update saved status. Please try again.', 'error');
    } finally {
      setSavingLoading(false);
    }
  };

  const handleDownloadPdf = () => {
    if (typeof window !== 'undefined') {
      window.print();
    }
  };

  return (
    <div className="d-flex align-items-center justify-content-lg-end gap-2 flex-wrap">
      <button 
        type="button"
        onClick={handleDownloadPdf} 
        className="btn btn-outline-warning rounded-pill text-xs fw-bold d-inline-flex align-items-center justify-content-center gap-1 shadow-2xs hover-lift" 
        style={{ 
          color: '#EF9720', 
          borderColor: '#EF9720', 
          backgroundColor: '#fffaf4',
          height: '36px',
          padding: '0 16px',
          fontSize: '12px'
        }}
      >
        <i className="bi bi-file-earmark-pdf text-danger fs-6"></i> Download PDF
      </button>

      <button 
        type="button"
        onClick={handleToggleSave}
        disabled={savingLoading}
        className={`btn rounded-pill text-xs fw-bold d-inline-flex align-items-center justify-content-center gap-1.5 shadow-2xs hover-lift transition-all ${
          isSaved 
            ? 'btn-danger text-white border-danger' 
            : 'btn-outline-danger'
        }`}
        style={{ 
          height: '36px',
          padding: '0 16px',
          fontSize: '12px'
        }}
        title={isSaved ? "Saved in your Wishlist & Account Dashboard" : "Save Package to Wishlist"}
      >
        <i className={`fa-heart ${isSaved ? 'fa-solid text-white' : 'fa-regular text-danger'}`}></i>
        <span>{isSaved ? 'Saved' : 'Save Package'}</span>
      </button>

      <ShareButton
        title={packageDetails?.title}
        text={packageDetails?.meta_description}
        url={"/package/" + packageDetails?.slug}
        wrapperStyle={{ display: 'inline-flex', height: '36px' }}
        className="btn btn-outline-warning rounded-pill text-xs fw-bold d-inline-flex align-items-center justify-content-center gap-1 shadow-2xs hover-lift"
        style={{ 
          color: '#EF9720', 
          borderColor: '#EF9720', 
          backgroundColor: '#fffaf4',
          height: '36px',
          padding: '0 16px',
          fontSize: '12px'
        }}
      />
    </div>
  );
}
