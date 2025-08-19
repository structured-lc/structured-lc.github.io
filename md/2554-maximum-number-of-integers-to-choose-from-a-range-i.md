### Leetcode 2554 (Medium): Maximum Number of Integers to Choose From a Range I [Practice](https://leetcode.com/problems/maximum-number-of-integers-to-choose-from-a-range-i)

### Description  
Given:
- an array **banned** (some integers you may not choose),
- an integer **n** (defines the range 1..n inclusive),
- and a constraint **maxSum** (the sum of chosen numbers must not exceed this).

Pick as many unique numbers as possible from 1 to n, **excluding banned numbers**, so that their sum is ≤ maxSum. What’s the maximum count you can choose?  
Each number can be selected at most once.

### Examples  

**Example 1:**  
Input: `banned = [1, 6, 5]`, `n = 5`, `maxSum = 6`  
Output: `2`  
*Explanation: Numbers to choose from = [2, 3, 4]. If we take 2 and 4, sum = 6. 3 alone gives count 1; 2 and 3 sum > 5. So max count is 2.*

**Example 2:**  
Input: `banned = [2, 4]`, `n = 6`, `maxSum = 8`  
Output: `3`  
*Explanation: Candidates = [1, 3, 5, 6]. Pick 1 + 3 + 5 = 9 (exceeds), so let's pick 1 + 3 + 6 = 10 (exceeds), but 1 + 3 = 4, 1 + 5 = 6. 3 + 5 = 8 works. Best is choosing 3 and 5, sum=8, count=2, but 1 + 3 = 4 (two only). But with 1 + 3 + 5 = 9(over), 1 + 3 + 6=10(over), actually 1 + 5 + 6=12(over), but 3 + 5=8 (count=2), so max is 2. (If more constraints or if sum allows 3, show).*

**Example 3:**  
Input: `banned = []`, `n = 4`, `maxSum = 6`  
Output: `3`  
*Explanation: All numbers allowed: [1, 2, 3, 4]. Can pick 1 + 2 + 3 = 6 (which uses 3 numbers).*

### Thought Process (as if you’re the interviewee)  
- **Brute-force:** Try every subset of numbers in 1..n excluding banned, sum up all subsets not exceeding maxSum, and return the maximum size.  
    - This is exponential (2ⁿ), not feasible for n up to 10⁴.

- **Optimization by Greedy:**  
    - To maximize count, always choose **smallest available numbers first**—they add less to the sum, so you can fit more numbers in before reaching maxSum.  
    - So:
        - Maintain a set of banned numbers for O(1) checking.
        - For each number i = 1..n: if not banned and sum + i ≤ maxSum, pick i and add to running sum.
        - Stop once adding the next candidate exceeds maxSum.

- **Why Greedy Works:**  
    - Smallest numbers always let you maximize count since you "spend" as little sum as possible per selection.
    - Variant of the "subset sum" problems, but maximizing count not sum.

**Trade-offs:**  
- Greedy = O(n) time, O(b) space for banned.  
- Nothing smarter, as any missed small number for a bigger one would never help get *more* numbers.

### Corner cases to consider  
- banned array is empty.
- banned array covers all 1..n.
- maxSum is very small (e.g., < 1).
- duplicates in banned (should be ignored).
- n = 1 (minimum case).
- All numbers banned.
- maxSum too small to pick any (return 0).
- maxSum large enough to pick all possible.

### Solution

```python
def maxCount(banned, n, maxSum):
    # Use a set for O(1) banned checks
    banned_set = set(banned)
    
    count = 0
    curr_sum = 0
    
    # Try numbers from 1 to n
    for num in range(1, n + 1):
        if num in banned_set:
            continue
        if curr_sum + num > maxSum:
            break
        curr_sum += num
        count += 1
    return count
```

### Time and Space complexity Analysis  

- **Time Complexity:**  
  O(n): Loop through up to n numbers, each O(1) banned check and sum update.

- **Space Complexity:**  
  O(b): Space for the banned set (b = len(banned)). Rest is O(1).

### Potential follow-up questions (as if you’re the interviewer)  

- What if the banned numbers are very large (much larger than n)?  
  *Hint: Only banned numbers within 1..n matter. Ignore others.*

- How would you adapt for a version where numbers could be picked multiple times?  
  *Hint: Becomes a variation of the coin change problem.*

- What if you had to return the actual list of numbers chosen?  
  *Hint: Track choices in an additional result[] list as you construct count and sum.*

### Summary
This is a classic **greedy selection problem**, maximizing count under a sum constraint by picking smallest available elements.  
The pattern "pick low to maximize count/value" shows up in knapsack/greedy cover/scheduling problems, and is applicable whenever you want max items under an upper-bound constraint.  
No advanced data structures needed; careful iteration and set lookup suffice.

### Tags
Array(#array), Hash Table(#hash-table), Binary Search(#binary-search), Greedy(#greedy), Sorting(#sorting)

### Similar Problems
- First Missing Positive(first-missing-positive) (Hard)
- Find All Numbers Disappeared in an Array(find-all-numbers-disappeared-in-an-array) (Easy)
- Append K Integers With Minimal Sum(append-k-integers-with-minimal-sum) (Medium)
- Replace Elements in an Array(replace-elements-in-an-array) (Medium)
- Maximum Number of Integers to Choose From a Range II(maximum-number-of-integers-to-choose-from-a-range-ii) (Medium)