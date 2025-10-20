### Leetcode 2085 (Easy): Count Common Words With One Occurrence [Practice](https://leetcode.com/problems/count-common-words-with-one-occurrence)

### Description  
Given two string arrays, **words1** and **words2**, return the number of strings that appear **exactly once in each array**. You're to count only those words which are unique in both arrays (i.e., occur once in each, not more, not less).  
Imagine two documents—you want to know how many unique words appear **exactly once** on both documents.

### Examples  

**Example 1:**  
Input: `words1 = ["leetcode", "is", "amazing", "as", "is"]`, `words2 = ["amazing", "leetcode", "is"]`  
Output: `2`  
*Explanation: "leetcode" and "amazing" both occur exactly once in each array. "is" occurs twice in words1, "as" is not in words2. So answer is 2.*

**Example 2:**  
Input: `words1 = ["b","bb","bbb"]`, `words2 = ["a","aa","aaa"]`  
Output: `0`  
*Explanation: No common words between the arrays at all. So answer is 0.*

**Example 3:**  
Input: `words1 = ["a", "ab"]`, `words2 = ["a", "a", "a", "ab"]`  
Output: `1`  
*Explanation: "ab" occurs once in each array. "a" occurs more than once in words2. So only "ab" is counted and answer is 1.*

### Thought Process (as if you’re the interviewee)  
Let’s break down the requirements:
- For a word to count, it must appear **exactly once** in both arrays.
- So, for each array, I should count how many times each word appears.
- This suggests building two hashmaps (or dictionaries in Python), one for each array, that record frequency of each word.
- Then iterate over the keys of the first hash map: if a word occurs once in its own array **and** once in the other’s map, increment a counter.
- **Brute force:** For each word in words1, count its frequency in both arrays = O(n²). Not efficient.
- **Optimized:** Use hashmaps to count all word frequencies first, check in O(1) per word.  
- Space: Need extra storage for two frequency maps.  
- Trade-offs: Hashmaps are fast on average, little downside for this problem size.

### Corner cases to consider  
- Empty arrays: if either array is empty, answer is 0.
- No overlap between arrays: answer is 0.
- All same words: if a word appears more than once in either array, it isn’t counted.
- Different word lengths and characters, but only lower-case English per problem.
- Large input size near 1000, so O(n) is OK.

### Solution

```python
def countWords(words1, words2):
    # Build frequency dictionaries for each array
    freq1 = {}
    freq2 = {}
    
    for word in words1:
        if word in freq1:
            freq1[word] += 1
        else:
            freq1[word] = 1

    for word in words2:
        if word in freq2:
            freq2[word] += 1
        else:
            freq2[word] = 1

    # Now count words appearing exactly once in both dictionaries
    count = 0
    for word in freq1:
        # Must be once in words1 and once in words2
        if freq1[word] == 1 and freq2.get(word, 0) == 1:
            count += 1
    return count
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(n + m), where n is len(words1) and m is len(words2). We iterate twice for counting (once per array) and once across freq1 for checking, all are linear in size of input.
- **Space Complexity:** O(n + m), since in the worst case all words are unique, so hashmaps store all words.

### Potential follow-up questions (as if you’re the interviewer)  

- What if the arrays are very large (e.g., millions of words)?  
  *Hint: Can you process in a streaming/one-pass way, or combine counting passes?*

- How would you modify your solution to find words that appear **k** times in both arrays?  
  *Hint: Parameterize the check from “== 1” to “== k”.*

- How would you return the list of such words, not just the count?  
  *Hint: Instead of incrementing by 1, store words in a list when condition matches.*

### Summary
This is a classic **hash map counting** problem: count word frequencies separately, then compare on the “exactly-once” condition. The **frequency counter** pattern is extremely popular and can be applied to matching, grouping, and deduplication scenarios in arrays/strings—especially when seeking “count exactly n times.” Common in counting anagrams, unique elements, or record deduplication.


### Flashcard
Count word frequencies in both arrays; count words that appear exactly once in each.

### Tags
Array(#array), Hash Table(#hash-table), String(#string), Counting(#counting)

### Similar Problems
- Intersection of Two Arrays(intersection-of-two-arrays) (Easy)
- Uncommon Words from Two Sentences(uncommon-words-from-two-sentences) (Easy)
- Kth Distinct String in an Array(kth-distinct-string-in-an-array) (Easy)