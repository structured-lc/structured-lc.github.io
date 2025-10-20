### Leetcode 1181 (Medium): Before and After Puzzle [Practice](https://leetcode.com/problems/before-and-after-puzzle)

### Description  
Given a list of **phrases** (strings with no leading, trailing, or consecutive spaces, and only lowercase English letters and single spaces), create all unique "Before and After puzzles."  
A "Before and After puzzle" is a phrase **created by merging two phrases** where the **last word** of the first phrase is *identical* to the **first word** of the second phrase.  
When merging, the matching word is *not* duplicated—phrases are concatenated, skipping the first word of the second phrase. All resulting puzzles should be returned in **lexicographical order**, with duplicates removed. You must consider all pairs where `i ≠ j` (the same phrase can't be paired with itself, but identical strings at different indexes can).

### Examples  

**Example 1:**  
Input: `["writing code", "code rocks"]`  
Output: `["writing code rocks"]`  
*Explanation: "writing code" ends with "code", "code rocks" starts with "code". Merge them: "writing code" + "rocks" = "writing code rocks".*

**Example 2:**  
Input: `["mission statement", "a quick bite to eat", "a chip off the old block", "chocolate bar", "mission impossible", "a man on a mission", "block party", "eat my words", "bar of soap"]`  
Output:  
`["a chip off the old block party",`  
`"a man on a mission impossible",`  
`"a man on a mission statement",`  
`"a quick bite to eat my words",`  
`"chocolate bar of soap"]`  
*Explanation: Multiple phrase merges are possible:*  
- "a chip off the old block" + "block party" ⇒ "a chip off the old block party"  
- "chocolate bar" + "bar of soap" ⇒ "chocolate bar of soap"  
- And so on.

**Example 3:**  
Input: `["a","b","a"]`  
Output: `["a"]`  
*Explanation: Only one puzzle is possible ("a" and "a"), which produces "a".*

### Thought Process (as if you’re the interviewee)  

- **Brute-force idea:**  
  Check every pair of phrases (`i`, `j` where `i ≠ j`). For each pair, split both phrases into words, and if the last word of phrase `i` matches the first word of phrase `j`, merge them (append phrase `j` words from the *second word onwards* to phrase `i`). Add all such merges to a set to avoid duplicates, then sort lexicographically.

- **Optimized idea:**  
  Since merging depends only on the **last word** of one phrase and the **first word** of another, we can preprocess.  
  Build a mapping from **first words** to phrase indices and from **last words** to phrase indices. Then, for each `i`, look up all `j ≠ i` where the first word of `phrases[j]` matches the last word of `phrases[i]`. For each valid (i, j) pair, create the merged puzzle.  
  This reduces comparisons and makes the solution scalable for larger inputs.

- Trade-off: For small limits, nested loops are acceptable, but mapping approach is still cleaner.

### Corner cases to consider  
- Input has duplicate phrases (e.g. ["a", "a"]): avoid self-pairing, but both can be used if at different indices.
- Phrases with only one word (["a", "b", "a"]), and merging produces a phrase identical to the original.
- No matching possible (result is empty list).
- Phrases with first and last word equal ("a a", "a b").
- All phrases identical ("a", "a", "a").
- Result with possible duplicates due to input but must return only unique puzzle phrases.

### Solution

```python
def beforeAndAfterPuzzles(phrases):
    # Stores all unique merged phrases
    result = set()
    n = len(phrases)
    
    # For speed, map first and last words to phrase indices
    first_word_to_indices = {}
    last_word_to_indices = {}
    
    # Precompute first and last words for all phrases
    first_words = []
    last_words = []
    
    for idx, phrase in enumerate(phrases):
        words = phrase.split()
        first = words[0]
        last = words[-1]
        first_words.append(first)
        last_words.append(last)
        # Map first word
        if first not in first_word_to_indices:
            first_word_to_indices[first] = []
        first_word_to_indices[first].append(idx)
        # Map last word
        if last not in last_word_to_indices:
            last_word_to_indices[last] = []
        last_word_to_indices[last].append(idx)
    
    # For each phrase, try to find matches based on its last word
    for i in range(n):
        last = last_words[i]
        if last in first_word_to_indices:
            for j in first_word_to_indices[last]:
                if i == j:
                    continue  # forward pairing must use different phrases
                # Merge phrases[i] + phrases[j] (without repeating join word)
                wi = phrases[i].split()
                wj = phrases[j].split()
                # Merged phrase: all of wi + wj[1:]
                merged = " ".join(wi + wj[1:])
                result.add(merged)
    
    # Return sorted list
    return sorted(result)
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(n² × k), where n is the number of phrases and k is the average number of words in a phrase. This is because, in the worst case, every pair is checked, and merging/joining requires iterating over word lists.
- **Space Complexity:** O(n × k) to store word splits and mappings, and up to O(n² × k) for result set if maximal merges are possible.

### Potential follow-up questions (as if you’re the interviewer)  

- How would you handle very large lists (n > 10⁴) of phrases efficiently?
  *Hint: Could you index phrases or use trie structures for more efficient queries?*

- How might you avoid rebuilding word lists or using split/join on every comparison?
  *Hint: Pre-parse phrases to lists of words; store reusable data.*

- Could you generalize this to merges where more than one consecutive word must match?
  *Hint: Try matching suffixes and prefixes of length > 1.*

### Summary
The solution uses a **mapping and string manipulation** pattern. Building fast-access dictionaries for first and last words enables efficient lookups, reducing unnecessary comparisons.  
This pattern—mapping points of interest to quickly find valid pairs—is common for problems like interval merging, word ladders, and dynamic sentence construction.  
The set and sort approach ensures duplicate removal and lexicographical order, which matches common requirements in interview and real-world problems involving text merging and deduplication.


### Flashcard
For each phrase pair, merge if last word of first matches first word of second; dedupe and sort results.

### Tags
Array(#array), Hash Table(#hash-table), String(#string), Sorting(#sorting)

### Similar Problems
