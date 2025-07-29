### Leetcode 3580 (Medium): Find Consistently Improving Employees [Practice](https://leetcode.com/problems/find-consistently-improving-employees)

### Description  
Given two tables, Employees (employee_id, name) and PerformanceReviews (review_id, employee_id, review_date, rating), find all employees who have *at least* 3 performance reviews and whose last 3 reviews have *strictly increasing* ratings (each more recent review is higher rated than the last).  
Return each such employee's name and their **improvement_score** (difference between the highest and lowest rating in the last 3 reviews).  
Order the results by highest improvement_score (descending), then by name (ascending).

### Examples  

**Example 1:**  
Input:  
Employees:  
| employee_id | name           |
|-------------|----------------|
| 1           | Alice Johnson  |
| 2           | Bob Smith      |
| 3           | Carol Davis    |
| 4           | David Wilson   |
| 5           | Emma Brown     |

PerformanceReviews:  
| review_id | employee_id | review_date  | rating |
|-----------|-------------|--------------|--------|
| 10        | 1           | 2023-01-15   | 2      |
| 11        | 1           | 2023-04-15   | 3      |
| 12        | 1           | 2023-07-15   | 4      |
| 13        | 1           | 2023-10-15   | 5      |
| 20        | 2           | 2023-02-01   | 3      |
| 21        | 2           | 2023-05-01   | 2      |
| 22        | 2           | 2023-08-01   | 4      |
| 23        | 2           | 2023-11-01   | 5      |
| 30        | 3           | 2023-03-10   | 1      |
| 31        | 3           | 2023-06-10   | 2      |
| 32        | 3           | 2023-09-10   | 3      |
| 33        | 3           | 2023-12-10   | 4      |
| 40        | 4           | 2023-10-21   | 4      |
| 41        | 4           | 2023-11-21   | 4      |
| 42        | 4           | 2023-12-21   | 4      |
| 50        | 5           | 2023-10-05   | 1      |
| 51        | 5           | 2023-12-12   | 2      |

Output:  
| name          | improvement_score |
|---------------|------------------|
| Bob Smith     | 3                |
| Alice Johnson | 2                |
| Carol Davis   | 2                |

*Explanation:*

- Alice Johnson: Last 3 ratings are 3, 4, 5 (strictly up). Score = 5-3 = 2
- Bob Smith: Last 3 ratings are 2, 4, 5 (strictly up). Score = 5-2 = 3
- Carol Davis: Last 3 ratings are 2, 3, 4 (strictly up). Score = 4-2 = 2
- David Wilson: Last 3 ratings are 4, 4, 4 (not improving)
- Emma Brown: Only 2 reviews (ignored)

**Example 2:**  
Input:  
Employee with reviews 4, 3, 5 in chronological order.  
Output:  
(no output)

*Explanation: Last 3 ratings are 4, 3, 5. Not strictly increasing (3 < 4 is false).*

**Example 3:**  
Input:  
Employee with reviews: 1, 2, 3 (dates: Jan, Feb, Mar)  
Output:  
Employee name, improvement_score = 2

*Explanation: 1 < 2 < 3, so improvement_score = 3 - 1 = 2.*

### Thought Process (as if you’re the interviewee)  

- Start by grouping performance reviews by employee and **sort by review_date** for chronological order.
- For each employee, check if they have **at least 3 reviews**.
- Take their **last 3 reviews** (most recent dates).
- Check if these 3 ratings are **strictly increasing**: r1 < r2 < r3.
- If so, compute improvement_score = r3 - r1.
- Collect (name, improvement_score) for such employees.
- At the end, **sort results** by improvement_score (desc), then name (asc).

**Brute-force idea:**  
- For each employee, pull all reviews, sort, analyze last 3.  
- Time and space likely fine due to constraints.

**Optimization:**  
- Early termination: Once you check the last 3 for an employee, if fail, skip them.
- Use only the minimal window needed for each employee.

**Trade-offs:**  
- Since only last 3 reviews matter, we don't need the rest beyond that window, but since we must know they're the last 3 by date, can't a priori skip.

### Corner cases to consider  
- Employee has less than 3 reviews → ignore.
- Ties in ratings (e.g., 3, 3, 4) → not strictly increasing, ignore.
- Descending or flat trends (e.g., 4, 4, 3, 3) → ignore.
- Employee with exactly 3 reviews, strictly increasing → include.
- Last 3 of many reviews must be checked (preceding reviews irrelevant).
- Multiple employees with same improvement_score → sort by name.
- Large input sets.
- Reviews out of order (by date): must sort.

### Solution

```python
def find_consistently_improving_employees(employees, performance_reviews):
    # Map from employee_id to name
    emp_id_to_name = {emp['employee_id']: emp['name'] for emp in employees}

    # Collect all reviews by employee_id
    from collections import defaultdict

    emp_reviews = defaultdict(list)
    for review in performance_reviews:
        emp_id = review['employee_id']
        emp_reviews[emp_id].append({
            'review_date': review['review_date'],
            'rating': review['rating']
        })

    result = []

    for emp_id, reviews in emp_reviews.items():
        # Only consider if at least 3 reviews
        if len(reviews) < 3:
            continue

        # Sort reviews by date (string sorting works for ISO/Gregorian-style YYYY-MM-DD)
        reviews.sort(key=lambda x: x['review_date'])
        
        # Take the last 3 reviews
        last3 = reviews[-3:]
        ratings = [r['rating'] for r in last3]

        # Check strictly increasing
        if ratings[0] < ratings[1] < ratings[2]:
            improvement_score = ratings[2] - ratings[0]
            result.append({
                'name': emp_id_to_name[emp_id],
                'improvement_score': improvement_score
            })

    # Sort by improvement_score desc, then name asc
    result.sort(key=lambda x: (-x['improvement_score'], x['name']))

    return result
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(N log R), where N is number of reviews and R is max number of reviews per employee. Sorting for each employee's reviews dominates.
- **Space Complexity:** O(N) for mapping and storing all reviews.

### Potential follow-up questions (as if you’re the interviewer)  

- How would you handle this if there were **tens of millions of employees/reviews**?
  *Hint: Can you process one employee at a time, or batch load if reviews are pre-sorted?*

- What would you do if the **requirement changed to last K reviews** instead of 3?
  *Hint: Generalize the window and strictly increasing check.*

- Suppose **ratings could have ties** (non-strict increase allowed)?
  *Hint: Change strictly increasing to non-decreasing (ratings[i] ≤ ratings[i+1]).*

### Summary
This problem uses the **sliding window** and **group by and sort** patterns: for each group (employee), consider the most recent fixed-size window of items.  
It's a standard approach in SQL and in-memory code when the property involves the last ⌊n/2⌋ or k items. Applies to problems involving time-ordered records, last-k aggregation, and trend validation.