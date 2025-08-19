### Leetcode 1100 (Medium): Find K-Length Substrings With No Repeated Characters [Practice](https://leetcode.com/problems/find-k-length-substrings-with-no-repeated-characters)

### Description  
Given a string `s` and an integer `k`, return the number of substrings of length `k` that have **no repeated characters**.  
A substring is a contiguous sequence of characters within a string.  
If `k` is larger than the length of `s`, or there are not enough unique characters, then return `0`.  
All characters in `s` are lowercase English letters.

### Examples  

**Example 1:**  
Input: `s = "havefunonleetcode"`, `k = 5`  
Output: `6`  
Explanation: The valid substrings are `havef`, `avefu`, `vefun`, `efuno`, `etcod`, `tcode`.

**Example 2:**  
Input: `s = "home"`, `k = 5`  
Output: `0`  
Explanation: Since `k` is greater than the length of `s`, there can be no valid substring.

**Example 3:**  
Input: `s = "abcabc"`, `k = 3`  
Output: `4`  
Explanation: The valid substrings are `abc`, `bca`, `cab`, `abc`. All of them have unique characters.

### Thought Process (as if you’re the interviewee)  
- **Brute-force:**  
  Check every substring of length `k` and see if all characters are unique.  
  But checking uniqueness takes O(k) for each window, leading to O(n\*k) overall, which is inefficient for long strings.
  
- **Optimize with sliding window:**  
  Since we only need to check substrings of length `k`, and each time we move the window right by one character,  
  we can use a **hash map or array** to track character counts within the window.  
  - When moving the window forward, decrement the count for the outgoing character and increment for the incoming one.  
  - If at any time there are duplicate characters in the window, the substring is not valid.  
  - This leads to O(n) time, since each character is added and removed at most once.

- **Edge checks:**  
  - If `k` is greater than the length of `s`, return 0 immediately.
  - If `k` > 26 (alphabet size), return 0 (because with lowercase English, can't have more than 26 unique letters).

### Corner cases to consider  
- Empty string (`s = ""`)
- `k = 0` or `k = 1`
- `k > len(s)`
- String with all identical characters (`s="aaaaa"`)
- String shorter than `k`
- `s` contains all unique characters and length `≥ k`

### Solution

```python
def numKLenSubstrNoRepeats(s: str, k: int) -> int:
    n = len(s)
    if k > n or k > 26:
        return 0
    
    count = [0] * 128  # ASCII size, for tracking character counts
    result = 0
    left = 0
    for right in range(n):
        # Increment the right character
        count[ord(s[right])] += 1

        # If we exceed k, need to slide window from left
        if right - left + 1 > k:
            count[ord(s[left])] -= 1
            left += 1

        # If window size == k and all unique, count
        if right - left + 1 == k and max(count[ord(c)] for c in s[left:right+1]) == 1:
            result += 1

    return result
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(n), where n is the length of `s`.
  - Each character is processed as it enters and exits the sliding window only once.
- **Space Complexity:** O(1)
  - The counter uses a fixed size array of size 128 (ASCII), independent of input size.

### Potential follow-up questions (as if you’re the interviewer)  

- What if the alphabet includes uppercase, digits, or special characters?  
  *Hint: Make the counter array/lists big enough or use a dict to support all possible values.*

- How would your approach change if `k` could be larger than 26, and `s` could include unicode characters?  
  *Hint: Use a dictionary/hashmap for dynamic tracking rather than a fixed array.*

- Can you modify the solution to return the actual substrings, not just the count?  
  *Hint: Instead of just incrementing count, append `s[left:right+1]` to a result list whenever you find a valid window.*

### Summary  
This problem is a classic **sliding window & hashing** pattern, efficiently finding substrings with unique characters.  
It's commonly used in substring, permutation, and windowed string problems.  
The technique generalizes to many scenarios where we need to track properties of a *window* over a sequence.

### Tags
Hash Table(#hash-table), String(#string), Sliding Window(#sliding-window)

### Similar Problems
