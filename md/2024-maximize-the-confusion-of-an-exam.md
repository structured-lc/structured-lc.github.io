### Leetcode 2024 (Medium): Maximize the Confusion of an Exam [Practice](https://leetcode.com/problems/maximize-the-confusion-of-an-exam)

### Description  
Given a string of answers consisting of only 'T' (true) and 'F' (false), and an integer `k`, you can change at most `k` answers (from 'T' to 'F' or vice versa). The task is to determine the maximum length of a sequence of consecutive questions whose answers can all be made the same (all 'T' or all 'F') after performing at most `k` flips.  
This models a scenario where we want to maximize confusion by making the longest run of identical answers in the exam key.

### Examples  

**Example 1:**  
Input: `answerKey = "TTFF", k = 2`  
Output: `4`  
*Explanation: Change both 'F's to 'T'. The answer key becomes "TTTT" (or "FFFF" by changing all 'T's). So the max consecutive same answers = 4.*

**Example 2:**  
Input: `answerKey = "TFFT", k = 1`  
Output: `3`  
*Explanation: Change either the first 'F' or second 'F' to 'T'. We get "TTFT" or "TFTT"—in both cases, the longest block is 3.*

**Example 3:**  
Input: `answerKey = "TTFTTFTT", k = 1`  
Output: `5`  
*Explanation: Change the single 'F' between the two pairs of 'T's to 'T'. The key becomes "TTTTTFTT" or "TTFTTTTT"—the max consecutive same answers is 5.*

### Thought Process (as if you’re the interviewee)  
Start by thinking through the brute-force approach:  
- For each possible substring, count the number of changes needed to make it all 'T' or all 'F'.  
- This is \(O(n^2)\) and too slow for large inputs.

To optimize, recognize that you want the *longest* window with at most `k` flips needed.  
- Use the sliding window technique: keep two pointers (left, right) that mark the window. 
- Track how many 'T's or 'F's would need to be flipped to make the window uniform.
- Expand the window to the right; if flips needed exceed `k`, move left to shrink the window.

Since you can transform to *either* all 'T' or all 'F', solve twice (once pretending to flip all 'F's, once all 'T's), and return the maximum.

**Why this works/Trade-off:**  
It gives O(n) as you only traverse the array a constant (2) number of times, tracking counts with simple counters.

### Corner cases to consider  
- Empty `answerKey` or length 1.
- All are 'T' or all are 'F'.
- `k` is 0 (no changes allowed).
- `k` ≥ length of `answerKey` (can flip everything).
- Alternating 'T'/'F' ("TFTFTF...").
- `answerKey` is already maximally uniform.

### Solution

```python
def maxConsecutiveAnswers(answerKey: str, k: int) -> int:
    # Helper function to find max window of chars == target with at most k flips
    def max_window(target: str) -> int:
        left = 0
        flips = 0
        res = 0
        for right in range(len(answerKey)):
            if answerKey[right] != target:
                flips += 1
            # If flips exceed k, slide window from left
            while flips > k:
                if answerKey[left] != target:
                    flips -= 1
                left += 1
            # Update max length found
            res = max(res, right - left + 1)
        return res

    # Try both making all 'T's and all 'F's
    return max(max_window('T'), max_window('F'))
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(n). 
  For each target ('T' and 'F'), we process the answerKey once with a sliding window for total 2 × n steps.
- **Space Complexity:** O(1).  
  Just a few pointers and counters; no extra storage beyond constants.

### Potential follow-up questions (as if you’re the interviewer)  

- What if the allowed operations must be distributed evenly between flipping 'T'→'F' and 'F'→'T'?  
  *Hint: Try tracking two separate flip counters within each window.*

- Can you generalize this approach to other characters or more than two possible answers?  
  *Hint: Sliding window + counts, but now you may need to track more types and use a map.*

- How would you handle streams—where you don’t know the full answerKey in advance?  
  *Hint: Maintain window counters dynamically as input arrives.*

### Summary
This problem is a prototypical application of the **sliding window** pattern, where you keep a window of interest and expand/contract based on constraints (here, at most `k` flips). It appears in problems about longest substrings/arrays with at most `k` mismatches or replacements—the technique is widely applicable for string and array questions involving a "with at most k operations" twist.

### Tags
String(#string), Binary Search(#binary-search), Sliding Window(#sliding-window), Prefix Sum(#prefix-sum)

### Similar Problems
- Longest Substring with At Most K Distinct Characters(longest-substring-with-at-most-k-distinct-characters) (Medium)
- Longest Repeating Character Replacement(longest-repeating-character-replacement) (Medium)
- Max Consecutive Ones III(max-consecutive-ones-iii) (Medium)
- Minimum Number of Days to Make m Bouquets(minimum-number-of-days-to-make-m-bouquets) (Medium)
- Longest Nice Subarray(longest-nice-subarray) (Medium)