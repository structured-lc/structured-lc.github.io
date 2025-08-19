### Leetcode 2379 (Easy): Minimum Recolors to Get K Consecutive Black Blocks [Practice](https://leetcode.com/problems/minimum-recolors-to-get-k-consecutive-black-blocks)

### Description  
Given a string `blocks` where each character is either 'B' (black) or 'W' (white), and an integer `k`, determine the minimum number of "recoloring" operations needed so that there’s at least one substring of `k` consecutive black blocks. In each operation, you can change a white block ('W') to black ('B').

### Examples  

**Example 1:**  
Input: `blocks = "WBBBW"`, `k = 3`  
Output: `0`  
*Explanation: The substring "BBB" (indexes 1-3) already exists, so no recoloring is needed.*

**Example 2:**  
Input: `blocks = "WBWBBBW"`, `k = 2`  
Output: `1`  
*Explanation: The smallest substring of length 2 that is not all black is "WB" (indexes 0-1). Change index 0 from 'W' to 'B': "BBWBBBW". Now "BB" appears. Only one recoloring is necessary.*

**Example 3:**  
Input: `blocks = "WWBWWB"`, `k = 3`  
Output: `2`  
*Explanation: The best you can do is change indexes 0 and 1 or 1 and 2 from 'W' to 'B'. For instance, turning indexes 1 and 2 into 'B' results in "WBBBWB" and "BBB" now appears. Two recolorings required.*


### Thought Process (as if you’re the interviewee)  
First, I notice that we want a substring of length `k` that is all black. To achieve this, the minimum number of white blocks in any sliding window of length `k` indicates how many changes are necessary.

- Brute-force approach: For every possible substring of length `k`, count the number of 'W'. Track the minimum over all substrings.
  - Time: O(n\*k), could be slow for large inputs.
- Optimization: Use a sliding window of size `k`. As the window moves right, update the count of white blocks efficiently, only adding the new rightmost and removing the leftmost when the window slides.
  - Time: O(n), since every character is visited at most twice.
- This is a textbook use-case for the sliding window pattern since windows are fixed-sized and overlapping.

### Corner cases to consider  
- `blocks` length < k (not possible; should be handled, can return len(blocks) if allowed)
- All blocks already black (should return 0)
- All blocks white (should return k)
- k = 1 or k equals the length of the blocks
- Only one block in the entire string

### Solution

```python
def minimumRecolors(blocks: str, k: int) -> int:
    n = len(blocks)
    min_recolors = float('inf')
    white_count = 0

    # Count whites in the first window
    for i in range(k):
        if blocks[i] == 'W':
            white_count += 1
    min_recolors = white_count

    # Slide the window
    for i in range(k, n):
        # Remove leftmost
        if blocks[i - k] == 'W':
            white_count -= 1
        # Add new rightmost
        if blocks[i] == 'W':
            white_count += 1
        if white_count < min_recolors:
            min_recolors = white_count

    return min_recolors
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(n), where n is the length of `blocks`. Each block is counted or discounted at most twice.
- **Space Complexity:** O(1) extra space. All we store is a few integer counters. No recursion or extra data structures.

### Potential follow-up questions (as if you’re the interviewer)  

- What if you wanted all such substrings instead of just one?
  *Hint: Keep track of all minimum windows; store starting indices.*

- How would you generalize the solution if converting black to white was allowed as well?
  *Hint: Allow recoloring both directions, calculate for both cases.*

- Can the same technique be used if instead of just 'B' and 'W', there are more colors?
  *Hint: Sliding window works if you can define "valid" substring as a function of window content.*

### Summary
We used the classic **sliding window** pattern for a fixed window: maintain a count while moving, updating efficiently in constant time per step. This pattern is commonly found in substring/count problems, especially when conditions are measured on a fixed-size substring. It’s effective for minimal operations, range queries, or any problem where overlapping windows are relevant.

### Tags
String(#string), Sliding Window(#sliding-window)

### Similar Problems
- Max Consecutive Ones III(max-consecutive-ones-iii) (Medium)
- Maximum Points You Can Obtain from Cards(maximum-points-you-can-obtain-from-cards) (Medium)
- Maximum Number of Vowels in a Substring of Given Length(maximum-number-of-vowels-in-a-substring-of-given-length) (Medium)