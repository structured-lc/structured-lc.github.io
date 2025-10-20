### Leetcode 1482 (Medium): Minimum Number of Days to Make m Bouquets [Practice](https://leetcode.com/problems/minimum-number-of-days-to-make-m-bouquets)

### Description  
Given an array `bloomDay`, where `bloomDay[i]` is the day the iᵗʰ flower blooms, and two integers `m` and `k`, you must make m bouquets, each with exactly k adjacent flowers. Return the minimum number of days needed to make m bouquets, or -1 if it is impossible.

### Examples  
**Example 1:**  
Input: `bloomDay = [1,10,3,10,2]`, `m = 3`, `k = 1`  
Output: `3`  
*Explanation: Must make 3 bouquets, each needs 1 adjacent flower; wait until day 3; flowers at day 1,2,3 bloom.*

**Example 2:**  
Input: `bloomDay = [1,10,3,10,2]`, `m = 3`, `k = 2`  
Output: `-1`  
*Explanation: Need 3 bouquets of 2 adjacent, but total flowers only 5; 3×2 > 5, impossible.*

**Example 3:**  
Input: `bloomDay = [7,7,7,7,12,7,7]`, `m = 2`, `k = 3`  
Output: `12`  
*Explanation: Need 2 bouquets of 3 adjacent bloomed; must wait until day 12 so a full group of 3 is bloomed.*

### Thought Process (as if you’re the interviewee)  
- Need to find minimum day so that at least m bouquets can be made from k adjacently bloomed flowers.
- Brute-force: Try each day 1..max(bloomDay), check possible bouquets. Too slow for big inputs.
- Optimize: **Binary search** on days! Each candidate day = canMake(day)? Check if possible to build m bouquets by scanning for groups of k adjacent flowers bloomed.
- Helper function: For a day, count bouquets using a pass through the array. Use binary search to find the smallest possible such day.

### Corner cases to consider  
- Impossible to get enough flowers: m*k > len(bloomDay)
- All flowers bloom on same day
- Only one bouquet needed
- k = 1 (any bloom becomes valid)

### Solution
```python
def minDays(bloomDay, m, k):
    n = len(bloomDay)
    if m * k > n:
        return -1
    left, right = min(bloomDay), max(bloomDay)
    def canMake(day):
        bouquets = flowers = 0
        for d in bloomDay:
            if d <= day:
                flowers += 1
                if flowers == k:
                    bouquets += 1
                    flowers = 0
            else:
                flowers = 0
        return bouquets >= m
    while left < right:
        mid = (left + right) // 2
        if canMake(mid):
            right = mid
        else:
            left = mid + 1
    return left
```

### Time and Space complexity Analysis  
- **Time Complexity:** O(n log D), D = max(bloomDay) - min(bloomDay)
- **Space Complexity:** O(1), only a constant amount of extra storage

### Potential follow-up questions (as if you’re the interviewer)  
- What if you want to maximize freshness (minimize latest pick)?
  *Hint: Binary search the day, always take earliest valid bouquets.*
- How do you modify if bouquets must be exactly k apart?
  *Hint: Change logic in canMake function accordingly.*
- How would you handle streaming bloomDay input?
  *Hint: Only need window of k; need m×k total for feasibility.*

### Summary
This problem is a pattern for binary search on the answer. Whenever checking a "minimum number to satisfy a condition" where possible answers are monotonic, try binary search with a predicate function.


### Flashcard
Binary search on days; for each candidate day, check if at least m bouquets of k adjacent bloomed flowers can be made by scanning the array.

### Tags
Array(#array), Binary Search(#binary-search)

### Similar Problems
- Maximize the Confusion of an Exam(maximize-the-confusion-of-an-exam) (Medium)
- Earliest Possible Day of Full Bloom(earliest-possible-day-of-full-bloom) (Hard)