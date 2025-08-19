### Leetcode 2557 (Medium): Maximum Number of Integers to Choose From a Range II [Practice](https://leetcode.com/problems/maximum-number-of-integers-to-choose-from-a-range-ii)

### Description  
You are given:
- A list **banned** of integers.
- An integer **n** as the highest value in the range [1, n].
- An integer **maxSum** (the maximum total sum allowed for all chosen integers).

**Goal:**  
Select as many distinct integers as possible from [1, n], subject to:
- No chosen integer is in **banned**.
- The total sum of chosen integers is ≤ **maxSum**.
- Each chosen integer is used at most once.

Return the *maximum number* of integers you can select under these constraints.

### Examples  

**Example 1:**  
Input: `banned = [1,4,6]`, `n = 6`, `maxSum = 4`  
Output: `1`  
Explanation: Only integer 3 can be chosen (3 is not banned, and sum=3 ≤ 4).

**Example 2:**  
Input: `banned = [4,3,5,6]`, `n = 7`, `maxSum = 18`  
Output: `3`  
Explanation: Can select 1, 2, and 7. All three are not banned and their sum is 10 (≤ 18).

**Example 3:**  
Input: `banned = [2]`, `n = 3`, `maxSum = 3`  
Output: `2`  
Explanation: Can pick 1 (sum=1) and 3 (sum=1+3=4), but 4 > 3, so only 1. Or, pick 3 alone (sum=3). So, possible is [1] or [3], output=1.

### Thought Process (as if you’re the interviewee)  

First, brute-force:
- Try all subsets of [1,n] \ banned, sum them, and check ≤ maxSum -- but infeasible since n can be up to 10⁹.

Optimizing:
- Since small numbers add less to the sum and allow more selections, always pick the smallest available integer first (greedy).
- Skip any number that is in `banned`.
- Keep a running sum; stop when adding the next available value would exceed maxSum.

Why greedy works:
- Choosing smaller numbers first maximizes count before sum crosses the limit.

Trade-offs:
- Need efficient way to skip banned numbers (use a set for O(1) lookup).
- Need to avoid enumerating all numbers up to n if n is huge but maxSum is small (can break early if curr > n or sum exhausted).

### Corner cases to consider  
- All numbers are banned: Can't pick any, output=0.
- maxSum smaller than the smallest non-banned number: Output=0.
- banned is empty or covers all small numbers but leaves large ones.
- maxSum much less than n, so the process ends early.
- banned has repeats (should be de-duplicated).
- n extremely large, but process stops quickly due to small maxSum.
- banned includes numbers outside [1, n] (ignore these).

### Solution

```python
def maxCount(banned, n, maxSum):
    # Convert banned to set for fast lookups and deduplicate
    banned_set = set(banned)
    count = 0      # number of chosen integers
    curr_sum = 0   # sum of chosen integers

    # Iterate from 1 to n (smallest to largest)
    for x in range(1, n+1):
        if x in banned_set:
            continue
        if curr_sum + x > maxSum:
            break
        curr_sum += x
        count += 1
    return count
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(n) in the worst case (if sum is large and n is not huge), but in practice, the loop ends when curr_sum exceeds maxSum, which is much less than n. So often O(k), where k is the number of selected numbers before exceeding maxSum.
- **Space Complexity:** O(m), where m = len(banned), due to the banned_set.

### Potential follow-up questions (as if you’re the interviewer)  

- How would you optimize further if n is close to 1e9 but maxSum is very small?
  *Hint: Stop the iteration as soon as curr_sum + x > maxSum, don't iterate all the way to n.*

- How do you handle duplicate numbers in 'banned'?
  *Hint: Use a set for banned for deduplication.*

- Can you do better than linear scan for huge n, perhaps using arithmetic series calculations or skipping large ranges?
  *Hint: Yes—use prefix sum formula for sum of natural numbers and skip over banned intervals.*

### Summary
The problem uses a classic *greedy* + *set lookup* approach: always pick the smallest available (non-banned) numbers to maximize count before exceeding maxSum. The pattern arises in many "maximize choices under sum/constraint" problems. When n is massive but maxSum is small, early exit is crucial for efficiency. This method generalizes to problems where we need to count numbers under exclusions and a global cap.

### Tags
Array(#array), Binary Search(#binary-search), Greedy(#greedy), Sorting(#sorting)

### Similar Problems
- First Missing Positive(first-missing-positive) (Hard)
- Find All Numbers Disappeared in an Array(find-all-numbers-disappeared-in-an-array) (Easy)
- Append K Integers With Minimal Sum(append-k-integers-with-minimal-sum) (Medium)
- Replace Elements in an Array(replace-elements-in-an-array) (Medium)
- Maximum Number of Integers to Choose From a Range I(maximum-number-of-integers-to-choose-from-a-range-i) (Medium)
- Maximize the Distance Between Points on a Square(maximize-the-distance-between-points-on-a-square) (Hard)