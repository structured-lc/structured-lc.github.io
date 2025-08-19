### Leetcode 2681 (Hard): Power of Heroes [Practice](https://leetcode.com/problems/power-of-heroes)

### Description  
You are given an integer array representing the **strength** of heroes. The **power** of a group of heroes is defined as:  
Power = (maximum strength in the group)² × (minimum strength in the group)  
Your task is to find the sum of powers for all possible **non-empty groups** (i.e., all subsets except the empty set). Since the answer can be large, return it modulo 10⁹+7.

### Examples  

**Example 1:**  
Input: `nums = [2,1,4]`  
Output: `141`  
*Explanation:  
All groups and their power:  
  - [2]: 2² × 2 = 8  
  - [1]: 1² × 1 = 1  
  - [4]: 4² × 4 = 64  
  - [2,1]: max=2, min=1 → 2² × 1 = 4  
  - [2,4]: max=4, min=2 → 4² × 2 = 32  
  - [1,4]: max=4, min=1 → 4² × 1 = 16  
  - [2,1,4]: max=4, min=1 → 4² × 1 = 16  
Sum = 8+1+64+4+32+16+16 = 141*

**Example 2:**  
Input: `nums = [1,1,1]`  
Output: `7`  
*Explanation:  
All groups will have power 1, so sum is 7.*

**Example 3:**  
Input: `nums = `  
Output: `729`  
*Explanation:  
Only one group: , power = 9² × 9 = 729*

### Thought Process (as if you’re the interviewee)  
- **Brute-force:**  
  Generate all 2ⁿ - 1 non-empty subsets, for each find min and max, then compute power.  
  - This is O(n × 2ⁿ), which is not feasible for n up to 10⁵.

- **Optimization Insight:**  
  - For each subgroup, the max and min determine the group power.  
  - Fix a number as the maximum. For each such maximum, calculate the sum of all powers for groups where this number is the maximum.
  - **Sort nums.** For each number (acting as maximum), sum contributions where previous elements can be combined as minima using prefix sums.
  - Use dynamic programming and prefix techniques to efficiently find the sum of minimums for all combinations ending with each max.
  - Specifically, for each current maximum, the total power contributed is:  
    (sum of minimum contributions from before) + (current value itself as its own minimum)  
    × current value².

- **Trade-offs:**  
  The prefix sum pattern brings time complexity to O(n log n) (for sort) and O(n) for calculation, a huge optimization.

### Corner cases to consider  
- Empty array (`[]`) — not valid as per constraints, but good to note.
- All elements equal (`[x, x, x, ...]`)
- Single element (`[x]`)
- Array with all unique elements  
- Already sorted in increasing or decreasing order  
- Very large numbers (test modulo)

### Solution

```python
MOD = 10 ** 9 + 7

def sumOfPower(nums):
    # Sort the array to facilitate prefix sums and max-min logic
    nums.sort()
    n = len(nums)
    res = 0  # Final result
    prefix = 0  # Prefix sum of all subsets' minimum so far

    for x in nums:
        # For all previous subsets, current x acts as max, 
        # prefix holds sum of their minimums over all subset choices
        res = (res + (x * x % MOD) * (prefix + x) % MOD) % MOD
        # Update prefix: each old subset can either include x or not, doubling the count
        prefix = (prefix * 2 + x) % MOD

    return res
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(n log n)  
  - Sorting takes O(n log n); the single pass loop is O(n).
- **Space Complexity:** O(1) extra space  
  - Uses variables for computation, input is modified in-place.

### Potential follow-up questions (as if you’re the interviewer)  

- If the array is very large and input is streamed, can you process results incrementally?  
  *Hint: Can you keep updating prefix and result as you read each element sorted?*

- How would the answer change if 'power' used sum instead of minimum?  
  *Hint: Can prefix sums help with subsets' total sums?*

- Suppose you have to output the actual groups with highest power. How would you approach that?  
  *Hint: Keep track of subsets contributing to max power as you update.*

### Summary
This solution relies on **sorting**, **prefix sums**, and treating each element as the max in combinations, a technique common in subset/sum/product enumeration under grouping rules. The pattern of using running prefix sums and doubling per subset (“each previous subset either includes or does not include the new element”) is widely applicable anywhere independent subset processing is needed—such as subset products, sums, or min/max count enumerations.

### Tags
Array(#array), Math(#math), Dynamic Programming(#dynamic-programming), Sorting(#sorting), Prefix Sum(#prefix-sum)

### Similar Problems
