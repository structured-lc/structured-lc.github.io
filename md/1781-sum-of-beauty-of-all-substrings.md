### Leetcode 1781 (Medium): Sum of Beauty of All Substrings [Practice](https://leetcode.com/problems/sum-of-beauty-of-all-substrings)

### Description  
Given a string s (only lowercase English letters), return the **sum of beauty of all its substrings**.  
- The *beauty* of a substring is the difference between the highest frequency and the lowest frequency (excluding chars not present) among the characters in that substring.

That is, for every substring, count for each letter how many times it appears, take the maximum frequency and the minimum (ignoring zeros), and compute:  
**beauty = max freq - min freq**  
Add up these for every substring.

### Examples  

**Example 1:**  
Input: `s = "aabcb"`  
Output: `5`  
*Explanation: The substrings with non-zero beauty are ["aab", "aabc", "aabcb", "abcb", "bcb"], each of which has beauty = 1. Add up: 1+1+1+1+1 = 5.*

**Example 2:**  
Input: `s = "aabcbaa"`  
Output: `17`  
*Explanation: All substrings are considered. Some have beauty >0, and together they sum to 17.*

**Example 3:**  
Input: `s = "abaacc"`  
Output: `8`  
*Explanation: All substrings are considered: for "abaacc", beauty = max(3 for 'a') - min(1 for 'b') = 2. Similarly, you sum for all substrings. Final sum is 8.*

### Thought Process (as if you’re the interviewee)  
- **Brute-force**:  
  - For every substring (O(n²)), count frequency of each character (O(n) work).
  - For each substring, sweep over its chars, count their occurrences in a hash table/array of size 26, then pick the max and the min (ignoring zeros).
  - Beauty for each = max freq - min freq.
  - Total time: O(n³) which is too slow for n ≤ 500.

- **Optimize**:  
  - Notice that for a fixed starting index, as we expand the substring to the right, we can update the count array in O(1) for each step.
  - For each starting index i from 0 to n-1:
    - Init count array of 26 zeros.
    - For every end index j from i to n-1:
      - Increment s[j] in count array.
      - Compute the current max and min (by checking 26 entries).
      - If there's at least 2 different letters, add `max - min` to total.
  - This makes it O(26 × n²) = O(n²).

- **Why this works:**  
  - For each substring, we only need to check the 26 possible letters.
  - O(n²) is optimal here, since there are O(n²) substrings and O(1) work per substring.

- **Trade-offs:**  
  - Keeps logic simple and clear.
  - Space O(1) (since we always use 26-long count array).
  - Cannot do much better due to substring count.

### Corner cases to consider  
- Single-character string (beauty always 0)
- All identical letters (all substrings have beauty 0)
- Strings with only two different letters
- Strings of minimal possible length
- Strings containing all 26 letters (max freq difference)
- Substrings with only one type of character

### Solution

```python
def beautySum(s: str) -> int:
    n = len(s)
    total = 0
    for i in range(n):
        count = [0] * 26  # Frequency of each letter
        for j in range(i, n):
            idx = ord(s[j]) - ord('a')
            count[idx] += 1
            # Find max and min frequency > 0 in this window
            max_freq = 0
            min_freq = float('inf')
            for freq in count:
                if freq > 0:
                    if freq > max_freq:
                        max_freq = freq
                    if freq < min_freq:
                        min_freq = freq
            if max_freq > min_freq:
                total += (max_freq - min_freq)
    return total
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(n² × 26) ⇒ O(n²), since for each substring (n²), we scan a 26-size array to compute max and min. This is efficient enough for n up to 500.
- **Space Complexity:** O(26) = O(1) extra space (the count array), no recursion or large extra objects.

### Potential follow-up questions (as if you’re the interviewer)  

- How would you handle very large strings (n > 10⁵)?
  *Hint: Is there a way to avoid counting from scratch or using advanced data structures?*

- Can you apply a divide and conquer or sliding window to reduce complexity?
  *Hint: Think about properties of substring frequency overlaps.*

- If the alphabet was much larger (e.g., arbitrary Unicode), how would the solution's complexity change?
  *Hint: Would the O(1) factor become O(K), and can you handle it?*

### Summary
We use an **O(n²)** approach by expanding every substring and maintaining char frequencies per window, then calculating max and min freq in O(1) since the alphabet size is constant (English lowercase letters). This is a classic substring / two-pointer pattern with static window stats—patterns like these appear whenever per-substring statistics are required and counting all substrings is feasible (n ≲ 1000).


### Flashcard
Optimize by expanding substrings from a fixed starting point, updating character counts to efficiently calculate the beauty of all substrings.

### Tags
Hash Table(#hash-table), String(#string), Counting(#counting)

### Similar Problems
- Substrings That Begin and End With the Same Letter(substrings-that-begin-and-end-with-the-same-letter) (Medium)