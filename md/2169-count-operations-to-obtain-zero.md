### Leetcode 2169 (Easy): Count Operations to Obtain Zero [Practice](https://leetcode.com/problems/count-operations-to-obtain-zero)

### Description  
Given two non-negative integers `num1` and `num2`, you repeatedly subtract the smaller from the larger (or if equal, subtract from either). Specifically, in each operation:
- If `num1 ≥ num2`, set `num1 = num1 - num2`.
- Else, set `num2 = num2 - num1`.
Count how many such operations are needed before either `num1` or `num2` becomes 0.

### Examples  

**Example 1:**  
Input: `num1 = 2, num2 = 3`  
Output: `3`  
*Explanation:*
- Operation 1: 3-2=1, state: 2,1
- Operation 2: 2-1=1, state: 1,1
- Operation 3: 1-1=0, state: 0,1

**Example 2:**  
Input: `num1 = 10, num2 = 10`  
Output: `1`  
*Explanation:*
- Operation 1: 10-10=0, state: 0,10

**Example 3:**  
Input: `num1 = 5, num2 = 4`  
Output: `5`  
*Explanation:*
- Operation 1: 5-4=1, state: 1,4  
- Operation 2: 4-1=3, state: 1,3  
- Operation 3: 3-1=2, state: 1,2  
- Operation 4: 2-1=1, state: 1,1  
- Operation 5: 1-1=0, state: 0,1  

### Thought Process (as if you’re the interviewee)  
First, the brute-force approach is to always subtract the smaller number from the larger in each step and increment the operation count. This mimics the given rules directly and will always terminate because we are either moving one of the numbers to 0 or decreasing the problem size in each step.

We can optimize by noticing that instead of repeated subtraction (for large differences), we can perform num1 // num2 operations at once when num1 ≥ num2, and update num1 = num1 % num2.  
For example, with num1=20, num2=3, instead of subtracting 3 seven times, we know directly it's 6 operations to reach num1=2 (since 20//3=6, 20%3=2).

The process closely resembles the Euclidean algorithm for GCD, except we sum the quotients at each step, rather than just finding when remainder hits 0.

This optimization reduces the total steps, especially for larger numbers, and the logic is simple and clean.

### Corner cases to consider  
- Either number is initially 0: the answer is 0 operations, since the loop doesn’t start.
- Both numbers are equal: exactly 1 operation.
- One or both numbers are 1: runs for the larger number times.
- Large difference between num1 and num2.
- Swapping is necessary if num2 > num1.

### Solution

```python
def countOperations(num1: int, num2: int) -> int:
    # Counter for total operations
    operations = 0
    while num1 != 0 and num2 != 0:
        # Always make num1 the larger, or equal
        if num1 < num2:
            num1, num2 = num2, num1
        # Add how many times num2 can be subtracted from num1 at once
        operations += num1 // num2
        # Update num1
        num1 = num1 % num2
    return operations
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(log(min(num1, num2))).  
  Each loop iteration reduces the larger number by at least half (when subtracting num2 from num1 multiple times), mirroring the Euclidean GCD algorithm.
- **Space Complexity:** O(1).  
  There’s no use of extra space beyond a constant number of variables.

### Potential follow-up questions (as if you’re the interviewer)  

- What if you need to return the actual sequence of operations?
  *Hint: Keep a list of pairs (num1, num2) or record each subtraction performed.*

- Can you solve the problem recursively?
  *Hint: Replace the loop with a recursive call, reducing the problem size each time.*

- Is there a mathematical relationship between the input and the total count?
  *Hint: Analyze how the operation counts relate to the Euclidean algorithm for GCD.*

### Summary
This problem is a variant of the classic Euclidean algorithm (used for GCD), but instead of just finding the divisor, we keep track of all the subtraction (division) steps as our answer. The coding pattern is similar to the one used for GCD, where we repeatedly reduce the size of the problem. This approach and optimization (jumping ahead by dividing instead of repeatedly subtracting) is a common one for problems revolving around "repeated reduction," and is applicable to areas involving division-based process reduction or number theory operations.


### Flashcard
Repeatedly subtract the smaller number from the larger until one is zero, counting operations—optimize with division for large differences.

### Tags
Math(#math), Simulation(#simulation)

### Similar Problems
- Number of Steps to Reduce a Number to Zero(number-of-steps-to-reduce-a-number-to-zero) (Easy)