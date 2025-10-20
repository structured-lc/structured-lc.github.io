### Leetcode 1698 (Medium): Number of Distinct Substrings in a String [Practice](https://leetcode.com/problems/number-of-distinct-substrings-in-a-string)

### Description  
Given a string s, return the number of **distinct substrings** in s.  
A substring is any consecutive sequence of characters within s.  
The answer should count every unique substring, regardless of how many times it appears.

### Examples  

**Example 1:**  
Input: `s = "aabbaba"`  
Output: `21`  
*Explanation: The set of distinct substrings is: "a", "b", "aa", "bb", "ab", "ba", "aab", "abb", "bba", "aba", "aabb", "abba", "bbab", "baba", "aabba", "abbab", "bbaba", "aabbab", "abbaba", "aabbaba".*

**Example 2:**  
Input: `s = "abcdefg"`  
Output: `28`  
*Explanation: All substrings are unique in this case (every possible substring of s). For n=7: total substrings = 7 × 8 / 2 = 28.*

**Example 3:**  
Input: `s = "aaa"`  
Output: `3`  
*Explanation: The only unique substrings are "a", "aa", and "aaa".*

### Thought Process (as if you’re the interviewee)  

- **Brute-force idea:** Enumerate all possible substrings and add each to a set to keep only unique substrings. This uses two nested loops: one for the start index and one for the end index. For each pair, take the substring and add it to the set.
    - Pros: Simple to implement, no tricky edge cases.
    - Cons: Inefficient for longer strings due to O(n²) time and O(n²) space complexity.
- **Optimizing further:**  
    - **Trie:** Insert all suffixes of the string into a trie (prefix tree), and count the number of nodes created. Each node represents a unique substring. Time complexity is O(n²) but reduced compared to brute-force by avoiding substring creation overhead.
    - **Suffix Array + LCP Array:** Compute the total number of substrings: n × (n+1)/2, then subtract the sum of all LCP (Longest Common Prefix) values for adjacent suffixes. This is efficient, but suffix array construction for this small n (n ≤ 500) is optional.
    - **Rolling Hash/HashSet:** For each substring length, compute a rolling hash to represent the substring and add to a set so uniqueness is still guaranteed, but string comparison cost reduces.  
- **Final approach decision:** For code clarity and simplicity, especially under real interview conditions, use the **brute-force with set** approach, or for a more "algorithmic" interview: use the **Trie** method to impress on data structure usage, showing O(n²) handling and awareness of scalable string techniques.

### Corner cases to consider  
- Empty string: Should return 0 (no substrings).
- All characters the same (like "aaa"): Only k unique substrings, for k = length.
- All characters unique: Total unique substrings = n × (n+1)/2.
- Strings with repeated patterns (like "ababab").
- Very short strings (length 1).

### Solution

```python
def countDistinct(s: str) -> int:
    # Use a set to store unique substrings
    substrings = set()
    n = len(s)
    
    # Iterate over all possible starting indices
    for start in range(n):
        # Build a substring starting from start index one character at a time
        current = ""
        for end in range(start, n):
            current += s[end]
            substrings.add(current)
    return len(substrings)
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(n²)
    - For each of n start indices, up to n substrings are scanned and added to the set.
    - The substring creation in the inner loop for each character is O(1) since string concatenation by addition to a set is amortized with python's internals. Still, overall, adding all O(n²) substrings dominates.
- **Space Complexity:** O(n²)
    - Up to n × (n+1)/2 unique substrings stored in the set.
    - No recursion stack or extra space beyond the set.

### Potential follow-up questions (as if you’re the interviewer)  

- How would you scale this for a much larger n (say, n > 10⁵)?
  *Hint: Consider advanced suffix data structures, and suffix automaton or generalized suffix trees.*
- Can you do this in true O(n) time for all lowercase input?
  *Hint: Try to build a suffix automaton on the fly; it's a highly advanced string topic.*
- What if you only needed the count for substrings of a fixed length k?
  *Hint: Rolling hash or a sliding window with a hash set would suffice here.*

### Summary
This problem leverages the **substring enumeration pattern** and highlights set-based deduplication. The naïve approach demonstrates brute-force, important for interviews for clarity, while trie/suffix-tree methods showcase proficiency with advanced data structures for optimized string handling. This pattern appears in questions involving substring counting, pattern matching, and string compression techniques.


### Flashcard
Number of Distinct Substrings in a String

### Tags
String(#string), Trie(#trie), Rolling Hash(#rolling-hash), Suffix Array(#suffix-array), Hash Function(#hash-function)

### Similar Problems
