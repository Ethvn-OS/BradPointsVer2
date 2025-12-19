function BackgroundImage() {
    return (
      <div 
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: "url('/src/assets/landingPagePhoto.jpg')",
          opacity: 0.4
        }}
      />
    );
  }
  
  export default BackgroundImage;