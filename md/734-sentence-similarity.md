### Leetcode 734 (Easy): Sentence Similarity [Practice](https://leetcode.com/problems/sentence-similarity)

### Description  
Given two sentences as string arrays (`words1` and `words2`), and a list of similar word pairs (`pairs`), determine if the sentences are similar.  
Two sentences are *similar* if:
- They have the same number of words.
- Each corresponding word is either *the same* or appears in the list of similar pairs.
- The similarity relation is **symmetric**: if `"good"` is similar to `"great"`, then `"great"` is similar to `"good"`.
- The similarity relation is **not transitive:** If `"good"` is similar to `"great"`, and `"great"` to `"fine"`, `"good"` is **not** similar to `"fine"`, unless it's also in the pairs.
- Every word is always similar to itself.

### Examples  

**Example 1:**  
Input:  
`words1 = ["great", "acting", "skills"]`,  
`words2 = ["fine", "drama", "talent"]`,  
`pairs = [["great","fine"],["acting","drama"],["skills","talent"]]`  
Output: `True`  
*Explanation: Each pair of corresponding words is either directly equal or in the list of similar pairs.*

**Example 2:**  
Input:  
`words1 = ["great"]`,  
`words2 = ["great"]`,  
`pairs = []`  
Output: `True`  
*Explanation: Both sentences are the same single word; a word is always similar to itself.*

**Example 3:**  
Input:  
`words1 = ["great"]`,  
`words2 = ["doubleplus","good"]`,  
`pairs = [["great","doubleplus"]]`  
Output: `False`  
*Explanation: Sentences have different lengths, so cannot be similar.*

### Thought Process (as if you’re the interviewee)  
First, check if both sentences have the same length—if not, return False immediately, because that's a hard requirement.  
Next, for each position \(i\), compare `words1[i]` and `words2[i]`. If they are exactly the same, continue. If not, check if the pair appears in the `pairs` list (either direction, because similarity is symmetric).  
To do this efficiently, preprocess all pairs into a set with both possible orderings for O(1) lookup.  
This brute-force method is fine because each list is at most 1000 long and at most 2000 pairs, so it's efficient enough. Advanced data structures (like DSU for transitive closure) are not needed because the problem doesn't require transitivity.

### Corner cases to consider  
- Sentences of different lengths (should return False)
- Sentences containing words not in any pairs (rely on direct equality)
- Empty sentences (should return True)
- Repeated words
- Similarity not being transitive (["good","great"],["great","fine"] doesn't mean ["good","fine"] is similar)
- Pair direction (ensure symmetry is enforced)

### Solution

```python
def areSentencesSimilar(words1, words2, pairs):
    # If lengths differ, sentences can't be similar
    if len(words1) != len(words2):
        return False

    # Preprocess pairs for fast lookup, including both orders
    similar = set()
    for w1, w2 in pairs:
        similar.add((w1, w2))
        similar.add((w2, w1))

    # Compare each word pair
    for w1, w2 in zip(words1, words2):
        if w1 == w2:
            continue
        if (w1, w2) not in similar:
            return False
    return True
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(n + m), where n = length of sentences, m = number of similar pairs.  
  (Preprocessing all pairs into a set takes O(m). Comparing word pairs at each index is O(n). Set lookups are O(1) on average.)
- **Space Complexity:** O(m), for storing all similar pairs in a set.

### Potential follow-up questions (as if you’re the interviewer)  

- What if the similarity relation becomes transitive?
  *Hint: Could use Union-Find (Disjoint Set Union) to connect similar words.*

- How would you handle very large sentences or pairs, where building a set is too expensive?
  *Hint: Discuss streaming methods, or mapping only as needed.*

- Can you design this for streaming inputs, where sentences come one word at a time?
  *Hint: Need to process similarity in real-time, possibly maintaining dynamic sets.*

### Summary
This problem demonstrates the "hash set for pair membership" pattern, which is useful when you need to efficiently check for symmetric relationships between elements. It is a common approach for word-ladder, transformations, synonym/antonym checks, and other string similarity or relation problems. No advanced data structure is required here because the relation is not transitive; all checks are performed directly with a preprocessed set.

### Tags
Array(#array), Hash Table(#hash-table), String(#string)

### Similar Problems
- Number of Provinces(number-of-provinces) (Medium)
- Accounts Merge(accounts-merge) (Medium)
- Sentence Similarity II(sentence-similarity-ii) (Medium)