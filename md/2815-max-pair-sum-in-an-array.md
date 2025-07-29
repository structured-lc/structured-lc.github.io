### Leetcode 2815 (Easy): Max Pair Sum in an Array [Practice](https://leetcode.com/problems/max-pair-sum-in-an-array)

### Description  
Given a 0-indexed array of integers **nums**, find the **maximum sum of a pair** of numbers where both numbers have the same **maximum digit** (the largest single digit in each number, 0-9).

For each unique maximum digit, you can pair the two largest numbers with that digit and consider their sum for the result.

Return the **largest sum** from all possible such pairs, or **-1** if no such pair exists.

### Examples  

**Example 1:**  
Input: `nums = [51,71,17,24,42]`  
Output: `88`  
*Explanation:*
- 71 and 17 carry 7 as their largest digit; their sum is 88.
- 24 and 42 carry 4 as largest digit; sum is 66.
- Best is 88.

**Example 2:**  
Input: `nums = [1,2,3,4]`  
Output: `-1`  
*Explanation:*
- No two numbers have the same max digit, so no valid pair.

**Example 3:**  
Input: `nums = [89,98,77,99]`  
Output: `197`  
*Explanation:*
- 98 and 89: max digit 9 for both, sum 187.
- 99 and 98: max digit 9 for both, sum 197.
- Best is 197.

### Thought Process (as if you’re the interviewee)  

- **Brute Force Idea:**  
  Check all pairs (i, j), compute the max digit of each number, and if they match, record the sum. Track max sum found.  
  But O(n²), slow for larger n.

- **Optimizing:**  
  - We only care about pairs with the same max digit.  
  - For each possible max digit (0-9), maintain a list of all numbers with that max digit.
  - For each such bucket, if bucket size ≥ 2, pick the two largest numbers → get their sum.
  - The answer is the largest pair sum over all buckets.
  - Finding the max digit for each integer is simple (string or digit math) and O(#digits).

- **Trade-offs:**  
  - This approach is O(n × k), k = number of digits in the largest number (≈5).  
  - Extra space is small, as only up to 10 buckets (for digits 0 to 9).

### Corner cases to consider  
- Numbers with only one occurrence of a max digit (cannot form pair).
- All numbers have different max digits (expect `-1`).
- Duplicates: multiple numbers equal but both can be paired.
- Negative numbers? (Not in constraints; only positives)  
- Small array: [1, 1] → must be able to pair two 1s, sum is 2.

### Solution

```python
def maxSum(nums):
    # Step 1: Prepare 10 buckets for each possible max digit (0-9)
    # Using a dict for better readability
    buckets = {d: [] for d in range(10)}  # digit: list of nums

    # Step 2: Group numbers by their max digit
    for num in nums:
        max_digit = max(int(ch) for ch in str(num))
        buckets[max_digit].append(num)

    max_sum = -1

    # Step 3: For each bucket, if it has at least 2 numbers, take two largest
    for lst in buckets.values():
        if len(lst) >= 2:
            lst.sort(reverse=True)  # largest first
            pair_sum = lst[0] + lst[1]
            if pair_sum > max_sum:
                max_sum = pair_sum

    return max_sum
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(n × k)  
  Where n is the number of elements, k is the number of digits in maximum number (since `max_digit` involves digit-wise scan; constraints: max 5 digits). Sorting each small bucket costs at most O(10 × 2 × log2) in practice.
- **Space Complexity:** O(n)  
  For the buckets storing up to n numbers in total.

### Potential follow-up questions (as if you’re the interviewer)  

- How could you optimize if n was much larger?  
  *Hint: Keep track of only top 2 largest per bucket, avoid storing all values.*

- Can you implement this without using sorting?  
  *Hint: While filling the buckets, maintain just the top two largest for each digit.*

- How do you adjust for negative numbers or zeros?  
  *Hint: Ensure max digit calculation and sum logic handle such numbers correctly.*

### Summary
This problem illustrates the **bucket grouping + greedy selection** approach: categorize numbers by an attribute (here, max digit), and then optimize over each group. It's a variant of the "group by frequency, then maximize/minimize within group" pattern, which is applicable in many digit- or value-bucketed subarray or substring problems.