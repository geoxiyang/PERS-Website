import h5py
import numpy as np
import matplotlib.pyplot as plt

FILE = "/Users/xy4f/Downloads/NEON_D02_SCBI_DP3_742000_4310000_reflectance.h5"

COMBOS = [
    ("True Color",          640, 550, 460),
    ("Color Infrared",      850, 680, 550),
    ("False Color NIR",     850, 1650, 640),
    ("Red Edge",            725, 800, 640),
    ("SWIR Geology",       2200, 1650, 640),
    ("Enhanced Vegetation", 800, 550, 460),
]


def load_data(path=FILE):
    with h5py.File(path, "r") as f:
        refl = f["SCBI/Reflectance/Reflectance_Data"][:]
        wl   = f["SCBI/Reflectance/Metadata/Spectral_Data/Wavelength"][:]
    refl = refl.astype(np.float32)
    refl[refl == -9999] = np.nan
    refl /= 10_000.0
    return refl, wl


def nearest_band(wl, target_nm):
    return int(np.argmin(np.abs(wl - target_nm)))


def percentile_stretch(arr, lo=2, hi=98):
    out = np.empty_like(arr)
    for c in range(arr.shape[2]):
        ch = arr[:, :, c]
        valid = ch[~np.isnan(ch)]
        p_lo, p_hi = np.nanpercentile(valid, [lo, hi])
        out[:, :, c] = np.clip((ch - p_lo) / (p_hi - p_lo + 1e-9), 0, 1)
    return out


def make_rgb(refl, wl, r_nm, g_nm, b_nm):
    bands = [nearest_band(wl, nm) for nm in (r_nm, g_nm, b_nm)]
    rgb = np.stack([refl[:, :, b] for b in bands], axis=2)
    return percentile_stretch(rgb)


def plot_all(refl, wl, outfile="neon_composites.png"):
    # Lower-left 600×600 m crop
    refl_crop = refl[400:1000, 0:600, :]

    fig, axes = plt.subplots(2, 3, figsize=(12, 8), facecolor="#0d0d0d")

    for ax, (title, r, g, b) in zip(axes.flat, COMBOS):
        rgb = make_rgb(refl_crop, wl, r, g, b)
        rgb = np.nan_to_num(rgb, nan=0.0)
        ax.imshow(rgb, interpolation="bilinear")
        ax.axis("off")

    plt.subplots_adjust(left=0, right=1, top=1, bottom=0, wspace=0.004, hspace=0.004)
    plt.savefig(outfile, dpi=180, bbox_inches="tight",
                facecolor=fig.get_facecolor())
    print(f"Saved → {outfile}")


if __name__ == "__main__":
    print("Loading reflectance data...")
    refl, wl = load_data()
    print(f"  shape={refl.shape}  wavelengths {wl[0]:.1f}–{wl[-1]:.1f} nm")
    plot_all(refl, wl)
