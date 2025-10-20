### Leetcode 2644 (Easy): Find the Maximum Divisibility Score [Practice](https://leetcode.com/problems/find-the-maximum-divisibility-score)

### Description  
Given two integer arrays, **nums** and **divisors**, the divisibility score of a divisor is defined as the count of how many numbers in **nums** are divisible by it (i.e., `num % divisor == 0`).  
Your task is to determine which divisor has the highest divisibility score. If multiple divisors have the same maximum score, return the smallest such divisor.

### Examples  

**Example 1:**  
Input: `nums = [4,7,9,3,9], divisors = [5,2,3]`  
Output: `3`  
*Explanation:*
- For divisor 5: only 0 number divisible.
- For divisor 2: only 1 number (4) divisible.
- For divisor 3: 3 numbers (9, 3, 9) divisible.
- Highest count is 3 (divisor 3).

**Example 2:**  
Input: `nums = [20,14,21,10], divisors = [5,7,5]`  
Output: `5`  
*Explanation:*  
- For divisor 5: numbers 20, 10 divisible (count 2).
- For divisor 7: number 14, 21 divisible (count 2).
- Two divisors (5, 7) have the same score; return the smaller value → 5.

**Example 3:**  
Input: `nums = , divisors = [10,16]`  
Output: `10`  
*Explanation:*  
- Both divisors, no numbers in nums are divisible by 10 or 16.
- Both have score 0, return the smallest: 10.

### Thought Process (as if you’re the interviewee)  
- **Brute force** idea: For each divisor, iterate through all numbers in nums and count how many are divisible by the current divisor. Keep track of the highest score and the corresponding smallest divisor.
- **Optimization:** Since nums and divisors arrays are both small (as is typical in an "easy" constraints problem), there’s no need for further optimization; brute-force is acceptable.
- **Final approach:**  
  - For each divisor in divisors:
    - Initialize a count as 0.
    - For each number in nums, if num is divisible by divisor, increment the count.
    - After checking all nums for a single divisor, update the output if this divisor has a higher score, or same score but is smaller.
  - Return the divisor with the highest divisibility score (smallest in tie).

### Corner cases to consider  
- nums or divisors have only one element.
- No nums are divisible by any divisors; all counts are 0.
- All nums are divisible by multiple divisors.
- There are negative numbers (check sign handling with modulo).
- There are duplicates in divisors.
- Divisors contains 1 (always divides everything).
- Very large values in nums or divisors.

### Solution

```python
def maxDivScore(nums, divisors):
    # Track the best score and corresponding smallest divisor
    max_count = -1
    result = None
    
    for divisor in divisors:
        count = 0
        for num in nums:
            if num % divisor == 0:
                count += 1
        
        # Update result based on maximum score and tie-breaking by divisor value
        if count > max_count or (count == max_count and (result is None or divisor < result)):
            max_count = count
            result = divisor
    
    return result
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(n × m), where n = len(nums), m = len(divisors). For every divisor, we check all nums for divisibility.
- **Space Complexity:** O(1) extra space (besides input and loop variables).

### Potential follow-up questions (as if you’re the interviewer)  

- What if nums and divisors are very large (millions of elements)?  
  *Hint: Can you pre-process nums, or use hash maps to speed up counting for multiple queries on divisors?*

- How would you handle very big numbers (potential for overflow)?  
  *Hint: Python handles big integers, but you should be careful in C++/Java to avoid overflow with large abs values.*

- What if, instead of returning the smallest divisor, you must return all divisors with the maximal score?  
  *Hint: Can you store results in a list and return all at the end?*

### Summary
This problem is a direct application of brute-force counting and tie-breaking. The pattern here is "group/count by property and optimize with tie-break on value," commonly used in problems involving majority, frequency, or that ask for "smallest/largest with maximal property." This is a typical approach for easy problems but also a foundational skill for more complex scenarios.


### Flashcard
Find the divisor with the highest divisibility score by iterating through divisors and counting divisible numbers.

### Tags
Array(#array)

### Similar Problems
- Binary Prefix Divisible By 5(binary-prefix-divisible-by-5) (Easy)