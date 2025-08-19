### Leetcode 692 (Medium): Top K Frequent Words [Practice](https://leetcode.com/problems/top-k-frequent-words)

### Description  
Given an array of strings **words** and an integer **k**, return the **k** most frequent words. The result should be sorted by frequency from highest to lowest. If two words have the same frequency, the word with the lower lexicographical (alphabetical) order comes first. For example, if "apple" and "banana" each appear three times, "apple" comes before "banana".  
This problem tests both frequency counting and sorting with secondary criteria.

### Examples  

**Example 1:**  
Input: `words = ["i", "love", "leetcode", "i", "love", "coding"], k = 2`  
Output: `["i", "love"]`  
Explanation: Both "i" and "love" appear twice, which is more than the other words. Among them, "i" comes before "love" alphabetically.

**Example 2:**  
Input: `words = ["the", "day", "is", "sunny", "the", "the", "the", "sunny", "is", "is"], k = 4`  
Output: `["the", "is", "sunny", "day"]`  
Explanation:  
"the" appears 4 times, "is" 3 times, "sunny" 2 times, "day" once. Ordered by frequency, and then by lexicographical order.

**Example 3:**  
Input: `words = ["a", "b", "c", "a", "b", "b", "c"], k = 3`  
Output: `["b", "a", "c"]`  
Explanation:  
"b": 3 times, "a": 2 times, "c": 2 times. Among "a" and "c", "a" comes before "c". So, ["b", "a", "c"].

### Thought Process (as if you’re the interviewee)  
First thought is brute-force:
- Count the frequency of every word.
- Sort all words by their frequency.
- For equal frequency, sort lexicographically.
- Return the first k.

But this O(n log n) approach can be optimized for large n, especially if k is much smaller than n.

Optimized idea:
- Use a hashmap to count frequencies.
- Use a min-heap of size k to keep track of the top k frequent words.
- For heap sort, use pair (-frequency, word), so the highest frequency, then lex smallest, comes first.
- After building the heap, extract k elements and reverse if necessary.

Trade-offs:
- Using a heap reduces time to O(n log k).
- Sorting all words (if k ~ n) is simple and clear, but less optimal for huge n with small k.

Heap is preferred for large input, space is O(n) for frequency map, plus O(k) for heap.

### Corner cases to consider  
- words = [], k = 0 (empty input)
- All words are unique and k = number of words
- Multiple words have exactly same frequency
- k is 1
- All words are the same string
- word with capital letters? (per constraints, input is lowercase only.)

### Solution

```python
def topKFrequent(words, k):
    # Step 1: Count frequency of each word using a hashmap
    freq = {}
    for w in words:
        if w in freq:
            freq[w] += 1
        else:
            freq[w] = 1

    # Step 2: Build a list of (word, frequency) and sort
    # Sort by frequency desc, then lex order asc
    sorted_words = sorted(freq.items(), key=lambda x: (-x[1], x[0]))

    # Step 3: Extract only the words for the top k
    result = []
    for i in range(k):
        result.append(sorted_words[i][0])
    return result
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(n log n), where n = number of unique words.  
  Counting frequencies: O(N) for all words.  
  Sorting: O(n log n) for unique words.  
  (If you use heap: O(n log k), but with full sort it's O(n log n).)

- **Space Complexity:** O(n), for the hashmap and sorted list, where n = unique words.


### Potential follow-up questions (as if you’re the interviewer)  

- **How would you solve this if the data is too big to fit in memory?**  
  *Hint: Use external sort, streaming, or divide words into chunks with hash maps, and merge results.*

- **What if k is very large (close to total unique words)?**  
  *Hint: Heap loses much benefit, simple sort may be better in this case.*

- **Can you return results as a stream? (i.e., output 1 at a time in correct order.)**  
  *Hint: Think about using a priority queue or generator for efficient streaming.*

### Summary
This problem uses the **hashmap + sorting** pattern, common for many "top k" frequency/counting problems. In interviews, use a Counter/dictionary for counting, then sort with custom key. This pattern appears in problems involving logs, leaderboards, search indexes, and more—also with numbers, not just words. For further optimization (esp. if k ≪ n), a min-heap of size k may be used, but for medium-sized cases simple sort is clearest.

### Tags
Array(#array), Hash Table(#hash-table), String(#string), Trie(#trie), Sorting(#sorting), Heap (Priority Queue)(#heap-priority-queue), Bucket Sort(#bucket-sort), Counting(#counting)

### Similar Problems
- Top K Frequent Elements(top-k-frequent-elements) (Medium)
- K Closest Points to Origin(k-closest-points-to-origin) (Medium)
- Sort Features by Popularity(sort-features-by-popularity) (Medium)
- Sender With Largest Word Count(sender-with-largest-word-count) (Medium)
- Maximum Number of Pairs in Array(maximum-number-of-pairs-in-array) (Easy)