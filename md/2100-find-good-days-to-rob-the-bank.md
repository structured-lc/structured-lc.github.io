### Leetcode 2100 (Medium): Find Good Days to Rob the Bank [Practice](https://leetcode.com/problems/find-good-days-to-rob-the-bank)

### Description  
You're given an array `security` where `security[i]` is the number of guards at a bank on the iᵗʰ day. You and your gang want to rob the bank on a "good day":  
- Pick an integer `time`—there must be at least `time` days before and after the day in question.
- The iᵗʰ day is "good" if, for the `time` days *before*, the guards have not increased (`security[j] ≥ security[j+1]` for all days before i), and for the `time` days *after*, the number of guards has not decreased (`security[j] ≤ security[j+1]` for all days after i).

Return all indices of such "good" days.

### Examples  

**Example 1:**  
Input: `security=[5,3,3,3,5,6,2], time=2`  
Output: `[2,3]`  
*Explanation:  
- Day 2: previous 2 days (5→3→3, non-increasing), next 2 days (3→5→6, non-decreasing)  
- Day 3: previous 2 days (3→3→3), next 2 days (5→6→2; fails since 6→2 is decreasing), but since the problem wants ≤, it only looks at the first 2: 3→5→6 which is non-decreasing. Both 2 and 3 satisfy the rules.*

**Example 2:**  
Input: `security=[1,1,1,1,1], time=0`  
Output: `[0,1,2,3,4]`  
*Explanation:  
- With time=0, every day is automatically "good".*

**Example 3:**  
Input: `security=[1,2,3,4,5,6], time=2`  
Output: `[]`  
*Explanation:  
- No day has 2 non-increasing days before it.*

### Thought Process (as if you’re the interviewee)  
First, consider brute-force:
- For each day from `time` to `n-time-1`, check the previous `time` days are non-increasing, and the next `time` days are non-decreasing.  
- This leads to O(n × time) time complexity.

To optimize, precompute:
- For each day, track the count of consecutive days of non-increasing guards ending at that day (`non_inc[i]`), and likewise for non-decreasing guards starting at that day (`non_dec[i]`).  
- If both counts are at least `time` at index i, then it's a "good" day.

Choose this approach as it runs in O(n) and uses O(n) space. The trade-off: more storage for precomputation, but much faster runtime.

### Corner cases to consider  
- security is empty.
- time is 0 (all days are good).
- time is larger than length of security (no answer).
- security has constant values.
- security is strictly increasing or decreasing.
- time is 1.

### Solution

```python
def goodDaysToRobBank(security, time):
    n = len(security)
    if time == 0:
        return list(range(n))
    if n == 0 or n < 2 * time + 1:
        return []

    # non_inc[i]: number of consecutive non-increasing days ending at i
    non_inc = [0] * n
    for i in range(1, n):
        if security[i] <= security[i-1]:
            non_inc[i] = non_inc[i-1] + 1
        else:
            non_inc[i] = 0

    # non_dec[i]: number of consecutive non-decreasing days starting at i
    non_dec = [0] * n
    for i in range(n - 2, -1, -1):
        if security[i] <= security[i+1]:
            non_dec[i] = non_dec[i+1] + 1
        else:
            non_dec[i] = 0

    result = []
    for i in range(time, n - time):
        if non_inc[i] >= time and non_dec[i] >= time:
            result.append(i)
    return result
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(n), since we make three linear passes: one to fill `non_inc`, one for `non_dec`, and one last pass for the answer.
- **Space Complexity:** O(n), to store the `non_inc` and `non_dec` arrays (each O(n) size).

### Potential follow-up questions (as if you’re the interviewer)  

- How would you reduce space complexity to O(1)?  
  *Hint: You can use rolling counters and avoid extra arrays by only tracking the last counts for the sliding window.*

- How might this change if the interval before and after must be strictly decreasing/increasing (not non-increasing/non-decreasing)?  
  *Hint: Modify the comparisons `<=` to `<` or `>=` to `>` accordingly.*

- Can this be adapted to work for a real-time stream where security is updated daily?  
  *Hint: Maintain only relevant window statistics for the current index to determine eligibility.*

### Summary
This problem is a **prefix/suffix precomputation** problem or "two pointer with prefix statistics" pattern. This is similar to many problems where you need to quickly check consecutive properties in both directions (e.g., mountain arrays, longest plateau, etc). Precomputing prefix and suffix information per index is a powerful approach, and is commonly used in problems that check sliding window conditionals in both sides of each element.


### Flashcard
Precompute for each day the count of consecutive non-increasing days before and non-decreasing days after; a day is "good" if both counts are ≥ time.

### Tags
Array(#array), Dynamic Programming(#dynamic-programming), Prefix Sum(#prefix-sum)

### Similar Problems
- Non-decreasing Array(non-decreasing-array) (Medium)
- Longest Mountain in Array(longest-mountain-in-array) (Medium)
- Find in Mountain Array(find-in-mountain-array) (Hard)
- Maximum Ascending Subarray Sum(maximum-ascending-subarray-sum) (Easy)
- Find All Good Indices(find-all-good-indices) (Medium)