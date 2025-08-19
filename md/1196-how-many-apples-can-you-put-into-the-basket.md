### Leetcode 1196 (Easy): How Many Apples Can You Put into the Basket [Practice](https://leetcode.com/problems/how-many-apples-can-you-put-into-the-basket)

### Description  
Given a list of integers where each value represents the weight of an apple, and a basket that can carry at most 5000 units of weight, determine the **maximum number of apples** you can place in the basket without exceeding the limit. You can pick any subset of apples, but once the limit is reached or exceeded, you must stop.

### Examples  

**Example 1:**  
Input: `weight = [100, 200, 150, 1000]`  
Output: `4`  
*Explanation: All 4 apples can be put in the basket; total weight is 1450, which is ≤ 5000.*

**Example 2:**  
Input: `weight = [900, 950, 800, 1000, 700, 800]`  
Output: `5`  
*Explanation: Adding all apples gives 900 + 950 + 800 + 1000 + 700 + 800 = 5150 (>5000). Using the lightest 5 (700, 800, 800, 900, 950) gives 4150. So the maximum is 5 apples.*

**Example 3:**  
Input: `weight = [5000, 1, 1, 1]`  
Output: `3`  
*Explanation: We pick the three apples weighing 1 each (total 3), since any single 5000-unit apple alone exhausts the basket.*

### Thought Process (as if you’re the interviewee)  

First, since each apple has a positive weight and the total number of apples is not huge (up to 1000), a brute-force approach would try all combinations. But that would be very inefficient.

A key observation: **To fit the most apples, we should pack the smallest apples first.** That way, we use up less of the weight limit per apple, maximizing count.

Approach:
- **Sort** the apple weights in ascending order.
- **Iterate** through the list, adding each apple's weight to a running total.
- **Stop** once adding another apple would exceed the 5000 limit.
- **Count** how many apples were successfully added.

Final approach: Greedy by weight, single scan—optimal and efficient.

Trade-offs:  
- Simplicity and speed versus unnecessary brute-force or trying to select the optimal subset differently.
- Sorting dominates the time.

### Corner cases to consider  
- Empty array (`weight = []`): No apples, so answer is 0.
- All apples overweight (e.g., every apple weighs more than 5000): Can't add any, answer is 0.
- All apples weigh 1: Can fit up to 5000 apples, or all given apples if fewer than 5000.
- Only one apple, just at or below limit: Answer is 1.
- Some weights exactly add up to 5000.
- Large apples at the start, skip them and fill with light ones.

### Solution

```python
def maxNumberOfApples(weight):
    # Sort apple weights ascending to add lighter apples first
    weight.sort()
    total = 0
    count = 0
    
    # Add apples one by one until basket limit reached
    for w in weight:
        if total + w > 5000:
            break
        total += w
        count += 1
    return count
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(n log n), where n is the number of apples, due to sorting. The subsequent loop is O(n).
- **Space Complexity:** O(1) extra space (after sorting in place); O(n) if not sorting in place.

### Potential follow-up questions (as if you’re the interviewer)  

- What if the basket capacity or apple weights are much larger?
  *Hint: Does your integer accumulation risk overflow in other languages?*

- Can you solve it if you get streaming input (apples arrive one by one)?
  *Hint: Is sorting needed if apples arrive in order?*

- What if you were to maximize the total weight, not the apple count?
  *Hint: This is a knapsack variant—how does your approach change?*

### Summary
This problem uses the classic **greedy selection** pattern, where choosing the smallest feasible element at each step is optimal when maximizing count under a sum constraint. This is a special case of the knapsack problem where all "values" (one per apple) are equal and "weights" are positive. The same idea applies to problems about deadline scheduling (scheduling most jobs, or most papers before due date, etc.) and resource allocation.

### Tags
Array(#array), Greedy(#greedy), Sorting(#sorting)

### Similar Problems
