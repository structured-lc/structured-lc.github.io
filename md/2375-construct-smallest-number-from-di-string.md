### Leetcode 2375 (Medium): Construct Smallest Number From DI String [Practice](https://leetcode.com/problems/construct-smallest-number-from-di-string)

### Description  
Given a string `pattern` of length n consisting only of the characters 'I' (for "increasing") and 'D' (for "decreasing"), construct the lexicographically smallest number using the digits 1 through n+1 (each digit appears exactly once), such that:
- If pattern[i] == 'I', the iᵗʰ digit of the result is less than the (i+1)ᵗʰ digit.
- If pattern[i] == 'D', the iᵗʰ digit is greater than the (i+1)ᵗʰ digit.

You must return the resulting number as a string.

### Examples  

**Example 1:**  
Input: `pattern = "IIIDIDDD"`  
Output: `123549876`  
*Explanation: Place numbers such that every 'I' leads to a strictly increasing pair and every 'D' to a strictly decreasing pair. The smallest such number is constructed by using the stack method: push numbers and pop when you meet 'I', delaying popping for 'D'.*  

**Example 2:**  
Input: `pattern = "DID"`  
Output: `2143`  
*Explanation:  
- Start with 'D', so need the biggest at the first spot for it to decrease: stack = [1], then see 'D', add 2 (stack=[1,2]), then get 'I', pop (output='2'), then 'D' (add 3), then add 4 (output='2', then pop '3' and '1' and finally '4'). Final = '2143'.*  

**Example 3:**  
Input: `pattern = "IDID"`  
Output: `13254`  
*Explanation:  
- 'I' means first two digits are increasing (smallest possible: 1,2)
- 'D' means next is less (add 3, then since next sign is 'I', pop 3)
- 'I' means next is higher than prev (add 4, pop 4)
- End: push last, then flush stack: Output='1 3 2 5 4'.*  

### Thought Process (as if you’re the interviewee)  
Let’s break down how to generate the smallest number following a DI pattern:
- **Brute-force**: Try every permutation of [1, ..., n+1], checking if it satisfies the given pattern. This is factorial time and not efficient even for n ≈ 8.
- **Optimal strategy**:
    - The pattern tells you the local "ups" and "downs." If you scan the pattern and at an 'I', you want the current number to be less than the next; for 'D', it must be greater.
    - The trick is to use a *stack*: at each character in the pattern (plus an extra iteration for the end), push the next available number onto the stack. Whenever you see an 'I' or reach the end, pop all elements from the stack (popping delays output for 'D', giving you a decreasing run), placing those digits in the result.
    - This greedy plus stack approach ensures every time you increase your number as needed for 'I', and for 'D', you wait as long as you should before finalizing digits.
- **Why not just keep assigning numbers in order?** Because for a run of 'D's, you want to place the highest available number first so that you can step down for subsequent digits.

### Corner cases to consider  
- All 'I' (e.g., "III"): gives outputs in increasing order (e.g., '1234').
- All 'D' (e.g., "DDD"): output is strictly decreasing, so use the highest digits first (e.g., '4321').
- Alternating 'I' and 'D' patterns.
- Consecutive runs of 'D's or 'I's.
- Pattern of length 1 (minimal case, e.g., "I" or "D").
- Pattern uses maximum allowed length.

### Solution

```python
def smallestNumber(pattern: str) -> str:
    res = []             # Result as a list of chars
    stack = []           # Stack to handle descents
    n = len(pattern)
    
    for i in range(n + 1):    # Always n+1 digits in answer
        stack.append(str(i + 1))  # Use (i+1)ᵗʰ digit (1-indexed)
        
        # If at end or next is 'I', flush stack
        if i == n or pattern[i] == 'I':
            while stack:
                res.append(stack.pop())
                
    return ''.join(res)
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(n), where n is the length of the pattern. Each digit is pushed and popped once.
- **Space Complexity:** O(n): stack can at most store n+1 digits, and the output uses O(n) as well.

### Potential follow-up questions (as if you’re the interviewer)  

- How would you modify the approach to get the *largest* number instead?  
  *Hint: What if you push the largest available number first, or process 'I'/'D' in reverse?*

- Can you solve this without a stack?  
  *Hint: Simulate the process in-place or directly fill the result array backwards on 'D' runs.*

- What if pattern could contain other symbols, like '=' for equal?  
  *Hint: How would you handle constraints that require repeated digits or fixed pairs?*

### Summary
This problem is a classic example of *greedy + monotonic stack*. Whenever pattern constraints involve relative ordering ("increasing"/"decreasing") and you want the minimal or maximal solution, the stack approach allows you to defer selections until necessary.  
Patterns like this are common in permutation, array, or greedy algorithm tasks, such as "Find Permutation" or "Valid Parenthesis String" problems.