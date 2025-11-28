# [Practice](https://leetcode.com/problems/lexicographically-smallest-string-after-reverse)

### Description  

You are given a string `s` of length `n` consisting of lowercase English letters. You must perform exactly one operation: choose any integer `k` where `1 ≤ k ≤ n` and either reverse the first `k` characters or reverse the last `k` characters of the string. Return the lexicographically smallest string that can be obtained after performing exactly one such operation.

### Examples  

**Example 1:**  
Input: `s = "dcab"`  
Output: `"acdb"`  
*Explanation: We can choose k = 3 and reverse the first 3 characters. Reversing "dca" gives "acd", resulting in "acdb", which is the lexicographically smallest string achievable.*

**Example 2:**  
Input: `s = "xyzy"`  
Output: `"zyxy"`  
*Explanation: We can choose k = 2 and reverse the last 2 characters. The last 2 characters "zy" become "yz", giving us "xyyz". Actually, choosing k = 2 for the first 2 characters: "xy" becomes "yx", giving "yxzy". We can also choose k = 3 for the last 3 characters: "yzy" becomes "yzy" (palindrome). Testing all operations, we find that reversing the last 3 or choosing other values gives "zyxy" as the minimum.*

**Example 3:**  
Input: `s = "zaxy"`  
Output: `"ayxz"`  
*Explanation: We can reverse the last 3 characters "axy" to get "yxa", resulting in "zyxa". Or reverse the first 3 characters "zax" to get "xaz", resulting in "xazy". Testing all possibilities, we find the lexicographically smallest result.*

### Thought Process (as if you're the interviewee)  

**Brute Force Approach:**
The straightforward way to solve this is to try all possible values of `k` from 1 to n, and for each `k`, try both operations (reverse first k and reverse last k). This gives us 2n candidates. We then pick the minimum lexicographically.

For each operation, we'd reverse a substring and compare the resulting string with our current minimum. This involves creating new strings and comparing them.

**Optimization Consideration:**
Since we're comparing strings lexicographically, we need to compare them as complete strings. There's no way to avoid checking all possibilities because the optimal `k` depends on the actual characters in the string. However, we can optimize by:
- Using string slicing efficiently
- Comparing strings directly (Python's string comparison is lexicographic by default)
- Stopping early if we find a clearly optimal result

**Why This Approach:**
The constraint that we must perform exactly one operation leaves us no choice but to explore all possible operations. Since there are only 2n possibilities and n is reasonably small, brute force with proper comparison is acceptable. We iterate through each k, generate both possible reversed strings, and keep track of the lexicographically smallest one.

### Corner cases to consider  

- Single character string: `s = "a"` → only one operation produces `"a"`
- All identical characters: `s = "aaaa"` → all operations produce `"aaaa"`
- Already sorted string: `s = "abcd"` → reversing might make it worse
- Reverse sorted string: `s = "dcba"` → reversing first k=1 gives same; k=n gives `"abcd"`
- String with mixed order: Need to check all k values as the minimum can occur at various positions

### Solution

```python
def minimumString(s: str) -> str:
    n = len(s)
    # Start with the original string as our answer
    answer = s
    
    # Try all possible values of k from 1 to n
    for k in range(1, n + 1):
        # Operation 1: Reverse the first k characters
        # s[:k] is the first k characters, reversed with [::-1]
        # s[k:] is the remaining part
        reversed_first_k = s[:k][::-1] + s[k:]
        
        # Update answer with lexicographically smaller string
        if reversed_first_k < answer:
            answer = reversed_first_k
        
        # Operation 2: Reverse the last k characters
        # s[:-k] is everything except the last k characters
        # s[-k:] is the last k characters, reversed
        reversed_last_k = s[:-k] + s[-k:][::-1]
        
        # Update answer with lexicographically smaller string
        if reversed_last_k < answer:
            answer = reversed_last_k
    
    return answer
```

### Time and Space Complexity Analysis  

- **Time Complexity:** **O(n²)** — We iterate through n values of k (outer loop). For each k, we perform string slicing and reversal operations which take O(k) time, plus lexicographic comparison of two strings which takes O(n) time in the worst case. Summing across all iterations: ∑(k + n) from k=1 to n gives approximately O(n²).

- **Space Complexity:** **O(n)** — We create new strings for each reversed variant. Each reversed string takes O(n) space, but we only store one candidate string at a time, so the auxiliary space is O(n) for storing intermediate strings during the reversal operations.

### Potential follow-up questions (as if you're the interviewer)  

- (Follow-up question 1)  
  *What if we could perform up to k operations instead of exactly one? How would your approach change?*  
  *Hint: Consider dynamic programming or BFS to explore states; think about whether greedy still works.*

- (Follow-up question 2)  
  *Can you optimize this for very large strings (n > 10⁶) where O(n²) might be too slow?*  
  *Hint: Think about which positions of k are actually candidates for the minimum; can you prune the search space?*

- (Follow-up question 3)  
  *What if instead of reversing, we could perform other operations like rotating or sorting substrings?*  
  *Hint: The approach would generalize, but you'd need to compare all generated candidates; complexity depends on the operation.*

### Summary

This problem uses a **brute-force enumeration pattern** where we systematically try all valid operations and keep track of the best result. The key insight is that since we must perform exactly one operation and there are only O(n) possible operations to try, checking all of them is feasible. We leverage Python's built-in lexicographic string comparison to find the minimum.

This pattern applies to optimization problems where:
- The solution space is small and explicitly enumerable
- There's no mathematical pattern to skip candidates
- Direct comparison of candidates is efficient

Similar problems include finding the lexicographically smallest string after substring operations, or any problem requiring exploration of a finite set of states.


### Flashcard
Try all possible values of k (1 to n) and both operations (reverse first k, reverse last k); pick the lexicographically smallest result.

### Tags
Two Pointers(#two-pointers), Binary Search(#binary-search), Enumeration(#enumeration)

### Similar Problems
