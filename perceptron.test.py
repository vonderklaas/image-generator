import numpy as np
import matplotlib.pyplot as plt
from sklearn.model_selection import train_test_split
from sklearn import datasets
from perceptron import Perceptron


def accuracy(y_true: np.ndarray, y_pred: np.ndarray) -> float:
    """
    Compute the classification accuracy.

    Parameters:
        y_true (np.ndarray): Ground truth labels.
        y_pred (np.ndarray): Predicted labels.

    Returns:
        float: Accuracy score.
    """
    return np.mean(y_true == y_pred)


# ---- Generate 2D classification dataset ----
X, y = datasets.make_blobs(
    n_samples=150, n_features=2, centers=2, cluster_std=1.05, random_state=2
)
X_train, X_test, y_train, y_test = train_test_split(
    X, y, test_size=0.2, random_state=123
)

# ---- Train Perceptron ----
p = Perceptron(learning_rate=0.01, n_iters=1000)
p.fit(X_train, y_train)

# ---- Evaluate ----
predictions = p.predict(X_test)
print("Perceptron classification accuracy:", accuracy(y_test, predictions))

# ---- Plot decision boundary ----
assert p.weights is not None and p.bias is not None, "Model not trained properly."

fig = plt.figure()
ax = fig.add_subplot(1, 1, 1)
plt.scatter(X_train[:, 0], X_train[:, 1], marker="o", c=y_train)

x0_1 = np.amin(X_train[:, 0])
x0_2 = np.amax(X_train[:, 0])
x1_1 = (-p.weights[0] * x0_1 - p.bias) / p.weights[1]
x1_2 = (-p.weights[0] * x0_2 - p.bias) / p.weights[1]

ax.plot([x0_1, x0_2], [x1_1, x1_2], "k")

ymin = np.amin(X_train[:, 1])
ymax = np.amax(X_train[:, 1])
ax.set_ylim([ymin - 3, ymax + 3])

plt.title("Perceptron Decision Boundary")
plt.xlabel("Feature 1")
plt.ylabel("Feature 2")
plt.grid(True)
plt.show()
