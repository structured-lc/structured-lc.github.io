### Leetcode 1058 (Medium): Minimize Rounding Error to Meet Target [Practice](https://leetcode.com/problems/minimize-rounding-error-to-meet-target)

### Description  
Given a list of **prices** (as strings with three decimals) and a **target** integer, you must round each price either **up** (ceil) or **down** (floor) to an integer such that the sum of the rounded values equals the target. You must **minimize the total rounding error**, which is defined as the sum of the absolute differences between each rounded price and its original value.

Return the smallest possible rounding error as a string to three decimal places, or "-1" if it is impossible to meet the target.

- Each price must be rounded to either floor(price) or ceil(price).
- The total of all rounded prices must equal **target**.
- *Example*: If prices are ["0.700","2.800","4.900"], and target = 8, you can use [1,3,4] (rounded from [0.7,2.8,4.9]) to total 8.

### Examples  

**Example 1:**  
Input: `prices = ["0.700","2.800","4.900"], target = 8`  
Output: `"1.000"`  
*Explanation: Round 0.700 up (1), 2.800 up (3), 4.900 up (5): 1+3+5=9 (too high).  
If you do: floor, ceil, ceil -> 0 + 3 + 5 = 8, rounding error: 0.700 + 0.200 + 0.100 = 1.000.*

**Example 2:**  
Input: `prices = ["1.500","2.500","3.500"], target = 10`  
Output: `"-1"`  
*Explanation: All options produce sums ≠ 10. It's impossible to reach the target.*

**Example 3:**  
Input: `prices = ["2.000","2.001","2.999"], target = 7`  
Output: `"0.002"`  
*Explanation: 2.000 ➔ 2, 2.001 ➔ 2 (floor), 2.999 ➔ 3 (ceil). Errors: 0.000 + 0.001 + 0.001 = 0.002. 2+2+3=7.*

### Thought Process (as if you’re the interviewee)  
Let’s discuss an efficient approach:

- **Brute-force:** Try all combinations of floor and ceil for each price (2ᴺ possibilities), sum, and check if you can reach the target. Not feasible given up to 500 prices.  
- **Optimized Greedy:**  
  - Observe that for each price, rounding down (floor) is usually less error if the decimal is small, and rounding up (ceil) is better when the decimal is large — but you must exactly match the target.
  - For each price:
    - If it is already an integer (fractional part 0), it **must** be floor/ceil = itself.
    - For others, you can choose either.
  - Let total\_floor = sum of all floor(prices), total\_ceil = sum of all ceil(prices).
  - Define `k = target - total_floor`.  
    - You must round **k prices up** (ceil) and the rest down (floor).
    - k must be between 0 and the total number of non-integer prices (otherwise impossible).
  - Greedy step: To minimize rounding error, for k prices, pick the k with the **smallest fractional parts** to round up (ceil), so rounding error (1 - fractional_part) is minimized.

### Corner cases to consider  
- No possible way to sum to target (e.g., all integers and their sum ≠ target).
- All prices are already integers.
- Only one price, and target differs from floor and ceil.
- More or fewer non-integer prices than needed to reach target.
- Duplicate prices.
- Minimum and maximum values.

### Solution

```python
def minimizeError(prices, target):
    # Separate integer and non-integer prices
    floors = []
    ceils = []
    non_int_errors = []
    int_sum = 0
    non_int_count = 0
    
    for p in prices:
        p_val = float(p)
        p_floor = int(p_val)
        p_ceil = p_floor if abs(p_val - p_floor) < 1e-6 else p_floor + 1
        
        if abs(p_val - p_floor) < 1e-6:
            int_sum += p_floor
        else:
            non_int_count += 1
            floors.append(p_floor)
            ceils.append(p_ceil)
            non_int_errors.append(p_val - p_floor)  # fractional part
    
    # Must ceil k out of n non-integers, rest floor, so sum matches target
    # sum = int_sum + (sum floor all) + k
    min_sum = int_sum + sum(floors)
    max_sum = int_sum + sum(ceils)
    
    k = target - min_sum
    if k < 0 or k > non_int_count:
        return "-1"
    
    # To minimize error, pick the k smallest fractional parts to round up (ceil); rest round down (floor)
    fractional_parts = []
    for idx, p in enumerate(prices):
        f = float(p)
        if abs(f - int(f)) < 1e-6:
            continue
        fractional = f - int(f)
        fractional_parts.append(fractional)
    
    fractional_parts.sort()
    error = 0.0
    # Take (non_int_count - k) smallest fractions (round down): their error is fractional
    # Take k largest fractions (round up): their error is 1 - fractional
    for i in range(len(fractional_parts)):
        if i < len(fractional_parts) - k:
            error += fractional_parts[i]  # taken as is, rounded down
        else:
            error += 1 - fractional_parts[i]  # rounded up

    return "{0:.3f}".format(error)
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(n log n), sorting fractional parts dominates.
- **Space Complexity:** O(n), for storing fractional parts and intermediate data.

### Potential follow-up questions (as if you’re the interviewer)  

- Can you solve it **without sorting**?  
  *Hint: Use a selection algorithm to get top-K elements efficiently.*

- How would you handle **floating point precision** issues?  
  *Hint: Would working with integers (multiply by 1000) help?*

- Suppose prices have more than 3 decimal places, or are negative?  
  *Hint: What new cases would arise, and can the approach handle them?*

### Summary
This solution uses a **greedy + sorting** pattern determined by the combinatorial nature of the rounding options, and the need to optimize a cumulative error. The logic — selecting items by smallest (or largest) fractional parts — is common in problems that balance constraint satisfaction and cost minimization and can be used in rounding, distributing resources, or load balancing tasks.