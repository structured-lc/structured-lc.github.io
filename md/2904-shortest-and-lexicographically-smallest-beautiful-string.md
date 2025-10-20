### Leetcode 2904 (Medium): Shortest and Lexicographically Smallest Beautiful String [Practice](https://leetcode.com/problems/shortest-and-lexicographically-smallest-beautiful-string)

### Description  
Given a binary string `s` (contains only '0' and '1') and an integer `k`, a substring of `s` is called **beautiful** if it contains exactly `k` number of `'1'`s. You need to find the **shortest** beautiful substring. If there are multiple substrings of the same minimum length, return the **lexicographically smallest** one. If there is no beautiful substring, return an empty string.

### Examples  

**Example 1:**  
Input: `s = "100011001", k = 3`  
Output: `"00110"`  
*Explanation: Substrings with exactly 3 ones: "10001", "00011", "00110", "01100", "11001". The shortest ones are length 5, and among them, "00110" is lexicographically smallest.*

**Example 2:**  
Input: `s = "1011", k = 2`  
Output: `"10"`  
*Explanation: Substrings with 2 ones: "101", "011". Length 3, "011" < "101" lexicographically, so answer is "101". (Note: if you find "10" as substring, it's invalid as it only has 1 '1'. Use sample with correct counts.)*

**Example 3:**  
Input: `s = "0000", k = 1`  
Output: ``  
*Explanation: There are no substrings with exactly 1 one, so return empty string.*

### Thought Process (as if you’re the interviewee)  
Let me clarify the requirements:  
- I need to find substrings with exactly `k` ones.
- Among those, take the shortest.
- If multiple are shortest, pick the lex smallest.

**Brute-force:**  
I could iterate through all substrings, count '1's for each, and filter those with exactly `k`. Track the shortest length, and pick lex smallest.  
- Time complexity: O(n³) (for n substring endpoints, and checking each substring).

**Optimized Approach:**  
Since we are looking for substrings with exact number of '1's, a two-pointer (sliding window) approach fits:
- Use two pointers, left (`i`) and right (`j`).
- Move `j` and expand window, count number of '1's.
- If above `k`, move `i` to reduce count.
- Prune substrings having leading zeros (since '001' and '1' both have one '1', '1' is shorter and lex smaller).
- Each time we hit a window with exactly `k` ones, check if it's shorter than previous or same length but lex smaller.

This reduces time from O(n³) to O(n).

**Why two-pointers is preferred:**  
- We efficiently shrink/grow window with O(1) updates to count.
- Only substrings with valid counts are considered.
- Lex and length checks are constant time if we track the candidates.

### Corner cases to consider  
- s length < k, or less than k ones in total.
- s has no '1's (or only '0's).
- Multiple substrings with same length and different start indices.
- Leading/trailing zeros: "0001000", k = 1 → answer should be "1".
- k = 0 special case (not specified, clarify input; probably never happens).
- All ones: "1111", k = 2 → answer should be "11".

### Solution

```python
def shortestBeautifulSubstring(s: str, k: int) -> str:
    n = len(s)
    left = 0
    count_ones = 0
    answer = ""

    for right in range(n):
        # Expand window, count number of ones
        if s[right] == '1':
            count_ones += 1
        
        # Shrink window if count exceeds k, or if there are redundant leading zeros
        while count_ones > k or (count_ones == k and left < right and s[left] == '0'):
            if s[left] == '1':
                count_ones -= 1
            left += 1
        
        # When we have exactly k ones, consider current window
        if count_ones == k:
            candidate = s[left:right + 1]
            if (not answer or
                len(candidate) < len(answer) or
                (len(candidate) == len(answer) and candidate < answer)):
                answer = candidate

    return answer
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(n)  
  We process each character at most twice (once when right expands, once when left contracts), so total steps = 2n.

- **Space Complexity:** O(1)  
  We use pointers and counters, and just store the current best answer (not all candidates).

### Potential follow-up questions (as if you’re the interviewer)  

- How would you extend this to support queries for multiple values of k over the same s?  
  *Hint: Consider prefix sums for '1's and answer queries in O(1).*

- Can you return the start and end indices of the substring instead of the substring itself?  
  *Hint: Track positions when updating the answer.*

- How to handle if s can contain non-binary characters?  
  *Hint: Validate input or skip invalid windows.*

### Summary
This problem is a classic **two-pointer sliding window** application on strings: maintaining a dynamic window while enforcing constraints (here, count of '1's). The pattern is widely used for substring/window problems related to "at most", "exactly", or "at least" constraints on character or value frequency, such as "minimum window substring", "longest substring with at most k distinct characters", etc. Key to optimality is pruning search early and avoiding unnecessary substring enumeration.


### Flashcard
Use sliding window to find shortest substring with exactly k ones; among those, select the lexicographically smallest.

### Tags
String(#string), Sliding Window(#sliding-window)

### Similar Problems
