/**
 * Every object inside const letters is a letter
 * the order in which they appear in the website is based on the ID.
 * treat the IDs properly and increment them sequentially
 * 
 *   {
    id: 1,
    date: 'Aug 29, 2026',
    title: 'Letter title',
    music: 'path_to_music',
    startTime: 0, // Timestamp this specific song will start plaing on when opening it's assigned letter
    content: `First phrase,

  Letter content`
}
 */

export const letters = [
  {
    id: 1,
    date: 'Jun 6, 2026',
    title: 'Custom Letter Title 1',
    music: 'nastelbom-romantic1.mp3',
    startTime: 0,
    content: `Dearest Mary Jane,
I hope this letter finds you well. I wanted to take a quiet moment today to write to you and express just how much you mean to me. Even in the midst of everyday life, my thoughts frequently return to you and the wonderful moments we share.

Your presence brings warmth, kindness, and light into my world. Every memory with you is something I truly cherish, and I am constantly reminded of how fortunate I am to have you in my life. You have a way of making ordinary days feel special just by being yourself.

Thank you for your affection, your understanding, and all the happiness you bring into my life. I look forward to creating many more beautiful memories together in the time ahead.

With all my love,
Peter Parker`
},
{
    id: 2,
    date: 'Feb 14, 2026',
    title: 'Custom Letter Title 2',
    music: 'nastelbom-romantic2.mp3',
    startTime: 0,
    content: `My Dearest Mary Jane,

As I sit down to write these words, I am thinking of you and how grateful I am for everything we experience together. Life moves quickly, but whenever I pause to reflect on what brings me the most joy, you are always at the top of my mind.

You bring so much inspiration and comfort into my life. Whether we are sharing long conversations or simply enjoying quiet moments together, being with you feels natural and right. Your support and kindness mean more to me than I can easily put into words.

I wanted to remind you today of how deeply appreciated and loved you are. No matter where life takes us, know that you hold a very special place in my heart.

Yours always,
Peter Parker`
}
];

window.letters = letters;