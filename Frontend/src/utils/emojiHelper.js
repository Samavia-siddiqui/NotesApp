// Maps common keywords in note titles to relevant emojis
const emojiMap = [
  { keywords: ['grocery', 'shopping', 'shop', 'buy', 'market', 'food', 'milk', 'bread', 'eggs'], emoji: '🛒' },
  { keywords: ['task', 'todo', 'to-do', 'checklist', 'plan', 'daily', 'today', 'routine'], emoji: '📋' },
  { keywords: ['idea', 'app', 'concept', 'brainstorm', 'thought', 'innovation'], emoji: '💡' },
  { keywords: ['meeting', 'standup', 'call', 'conference', 'zoom', 'interview', 'schedule'], emoji: '📅' },
  { keywords: ['book', 'read', 'reading', 'study', 'learn', 'lecture', 'course', 'chapter'], emoji: '📚' },
  { keywords: ['money', 'budget', 'finance', 'expense', 'cost', 'payment', 'salary', 'invoice'], emoji: '💰' },
  { keywords: ['health', 'workout', 'gym', 'exercise', 'fitness', 'diet', 'medicine', 'doctor'], emoji: '💪' },
  { keywords: ['travel', 'trip', 'vacation', 'flight', 'hotel', 'journey', 'visit', 'tour'], emoji: '✈️' },
  { keywords: ['code', 'coding', 'bug', 'fix', 'deploy', 'github', 'api', 'backend', 'frontend', 'project', 'build'], emoji: '💻' },
  { keywords: ['birthday', 'party', 'celebrate', 'anniversary', 'event', 'festival'], emoji: '🎉' },
  { keywords: ['recipe', 'cook', 'meal', 'dinner', 'lunch', 'breakfast', 'kitchen', 'bake'], emoji: '🍳' },
  { keywords: ['password', 'login', 'account', 'security', 'key', 'credential'], emoji: '🔑' },
  { keywords: ['reminder', 'remember', 'forget', 'important', 'urgent', 'alert', 'note'], emoji: '⏰' },
  { keywords: ['work', 'office', 'job', 'career', 'business', 'client', 'report', 'deadline'], emoji: '💼' },
  { keywords: ['goal', 'target', 'aim', 'achievement', 'milestone', 'objective'], emoji: '🎯' },
  { keywords: ['music', 'song', 'playlist', 'album', 'concert', 'lyrics'], emoji: '🎵' },
  { keywords: ['movie', 'film', 'watch', 'series', 'show', 'episode', 'netflix'], emoji: '🎬' },
  { keywords: ['friend', 'family', 'call', 'contact', 'phone', 'message', 'text'], emoji: '👥' },
  { keywords: ['design', 'ui', 'ux', 'figma', 'layout', 'color', 'font', 'style'], emoji: '🎨' },
  { keywords: ['game', 'play', 'gaming', 'fun', 'challenge', 'score'], emoji: '🎮' },
  { keywords: ['quote', 'inspiration', 'motivat', 'wisdom', 'saying'], emoji: '✨' },
  { keywords: ['meeting', 'agenda', 'minutes', 'action items'], emoji: '📝' },
];

// Checks if a string starts with an emoji character
function startsWithEmoji(str) {
  if (!str) return false;
  // Unicode emoji detection using regex
  const emojiRegex = /^(\p{Emoji_Presentation}|\p{Emoji}\uFE0F)/u;
  return emojiRegex.test(str);
}

/**
 * Returns an appropriate emoji for the given note title.
 * Returns '' if the title already starts with an emoji.
 * Returns '📝' as a default fallback.
 */
export function getAutoEmoji(title) {
  if (!title) return '📝';

  // If title already begins with an emoji, don't add another
  if (startsWithEmoji(title)) return '';

  const lower = title.toLowerCase();

  for (const { keywords, emoji } of emojiMap) {
    if (keywords.some((kw) => lower.includes(kw))) {
      return emoji;
    }
  }

  // Generic fallback
  return '📝';
}
