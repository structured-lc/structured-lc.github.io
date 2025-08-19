### Leetcode 1370 (Easy): Increasing Decreasing String [Practice](https://leetcode.com/problems/increasing-decreasing-string)

### Description  
Given a string of lowercase English letters, reorder the string by repeatedly taking the smallest unused character and appending it to the result, then taking the next smallest character greater than the last, and so on until you can no longer. Then reverse: take the largest unused character, then the next largest, and continue until done. Repeat these two phases until all characters are used.

### Examples  

**Example 1:**  
Input: `s = "aaaabbbbcccc"`  
Output: `"abccbaabccba"`  
*Explanation:  
Step 1: Pick smallest ('a'), then next ('b'), then 'c' → result: "abc"  
Step 2: Pick largest ('c'), then next ('b'), then next ('a') → result: "abccba"  
Continue: "abccbaabccba".*

**Example 2:**  
Input: `s = "rat"`  
Output: `"art"`  
*Explanation:  
Step 1: Pick smallest ('a'), then 'r', then 't' → "art". Only one round needed as all are unique.*

**Example 3:**  
Input: `s = "leetcode"`  
Output: `"cdelotee"`  
*Explanation:  
Smallest in order: c d e l o t  
Reverse: e e  
Combined: "cdelotee".*

### Thought Process (as if you’re the interviewee)  
- First, I can simulate the process described, always picking the smallest unused letter, then the next up, etc., followed by reverse order.
- A brute-force method would build the result by repeatedly scanning the unused portion of the string for the next valid letter, but this would be inefficient (multiple traversals of the whole string).
- To optimize, I note that only lowercase letters appear, so I can use a count array of length 26 for the frequency.
- I traverse this count array in increasing order, and for each available letter (count > 0), append to the result and decrement the count.
- After a forward pass, I do a backward pass (z → a) and append where count > 0.
- I repeat until the resulting string is as long as the original.
- This approach is efficient, as it avoids repeatedly searching the string.

### Corner cases to consider  
- Empty string → should return empty string.
- String with all identical letters, e.g. `"aaaa"` → result is the same as input.
- String with all unique letters, e.g. `"abc"` → lexicographical order.
- String already sorted or reversed.
- Very long strings (test efficiency).

### Solution

```python
def sortString(s: str) -> str:
    # Count frequency of each character (26 lowercase English letters)
    count = [0] * 26
    for c in s:
        count[ord(c) - ord('a')] += 1
    
    n = len(s)
    result = []

    while len(result) < n:
        # Increasing: from 'a' to 'z'
        for i in range(26):
            if count[i] > 0:
                result.append(chr(i + ord('a')))
                count[i] -= 1
        # Decreasing: from 'z' to 'a'
        for i in range(25, -1, -1):
            if count[i] > 0:
                result.append(chr(i + ord('a')))
                count[i] -= 1

    return ''.join(result)
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(n), where n is the length of the string. Each character is visited in the count array a constant number of times (at most 52 passes of up to 26), so total work is proportional to n.
- **Space Complexity:** O(1) extra space, since the count array is fixed size (26), plus O(n) for the result string.

### Potential follow-up questions (as if you’re the interviewer)  

- How would your approach change if the input could contain uppercase letters?
  *Hint: What would be the size of your count array? Do you need to adjust your character indexing?*

- How would you handle Unicode or non-English characters?
  *Hint: Fixed-size frequency array may not work; need more generic data structure like a dictionary.*

- Could you solve without extra space for counts, modifying the string in place?
  *Hint: In-place operations or marking could be tricky; is it possible if order and counts must be preserved?*

### Summary
This problem involves simulation and frequency counting. The key pattern is using a fixed-size array to count character frequencies for quick lookup and ordered traversal. This counting method is common in problems requiring grouping or sorting by character, such as anagrams, bucket sort, or character frequency analysis. It shows the power of using the constraints (only lowercase letters) to improve efficiency.

### Tags
Hash Table(#hash-table), String(#string), Counting(#counting)

### Similar Problems
