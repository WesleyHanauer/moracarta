# Moracarta

**Create your own personalized love-letter website and deploy it completely for free.**

🌐 **[Live Demo](https://moracarta.pages.dev/)** · ⭐ **[GitHub Pages Demo](https://wesleyhanauer.github.io/moracarta/)**

## Features

💌 Multiple letters  
📝 Google Docs as your writing interface  
🎨 Customizable texts  
🌐 Free web deployment  
🔒 No database required  

## **Get your own working URL in less than 5 minutes**

**And it's as simple as:**

```bash
git clone https://github.com/WesleyHanauer/moracarta
cd moracarta
npm install
moracarta setup
moracarta build
moracarta deploy
```

### App Demo
<p align="center">
    <img src="public/assets/images/demo-main-page.png" height="400">
    <img src="public/assets/images/demo-animation.gif" height="400">
</p>

### Setup Demo

<img src="public/assets/images/setup-demo.png" width="100%">
<br><br>

## That's it.

All that's left is to write your letters in Google Docs and, if you want, customize the two texts displayed on the main page.

## Requirements

- Node.js 22+
- A Google account

### Adding letters

```bash
moracarta add
```

* Paste the link to your public Google Doc.
* **IMPORTANT:** Use spaces for indentation instead of `TAB`.
* Use a different Google Docs **tab** for each letter to keep your Google Doc organized.  

<p align="center">
    <img src="public/assets/images/googleDocsTabs.webp" width="400">
</p>
<br>

### Removing letters

```bash
moracarta remove
```

Select the letter you wish to remove.

### Customizing the website

During `moracarta setup`, you can choose from preset messages or enter your own custom text for the main page.

<p align="center">
    <img src="public/assets/images/custom-text-demo2.png" width="700"><br>
    <img src="public/assets/images/custom-text-demo1.png" width="700">
</p>

## License

Moracarta is open-source software licensed under the **MIT License**.

See the [LICENSE](LICENSE) file for the full license text.
